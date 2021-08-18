import React, { useState, useRef, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRhymes, getMeter, getCurrentUser, setError } from '../actions';
import { fetchCurrentUser } from '../api-client/auth';

import Login from './Login';
import { RedSpan } from './styled/Spans';
import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import Paginator from './styled/Paginator';
import PoemTile from './styled/PoemTile';
import Button from './styled/Button';
import Spinner from './styled/Spinner';
import Toast from './styled/Toast';
import TextInput from './styled/TextInput';

const UserPoems = props => {
  const { username, userpoems, error, getRhymes, getMeter, getCurrentUser, setError } = props;
  const history = useHistory();
  const poemsToRender = useRef(userpoems);
  const [filtered, setFiltered] = useState();
  const [author, setAuthor] = useState();
  const [sortBy, setSortBy] = useState('newestFirst');
  const [perPage, setPerPage] = useState(6);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({current:"", last:""});

  useEffect(() => {
    poemsToRender.current = userpoems;
    setFiltered(false);
  }, [loading]);

  const filterPoemsByAuthor = e => {
    const filterAuthor = e.target.innerHTML;
    setAuthor(filterAuthor);
    const filteredList = userpoems.filter(poem => filterAuthor === "Anonymous" ? poem.poem.author === "" : poem.poem.author === filterAuthor);
    poemsToRender.current = filteredList;
    setFiltered(true);
    setRefresh(refresh + 1);
    window.scrollTo(0,0);
  }

  // for search bar
  const sortFilteredList = (filteredList, query) => {
    const score = (poem, query) => {
      let runner = 0;
      query.split(" ").forEach(q => {
        if (poem.poem.title.toLowerCase().includes(q.toLowerCase())) runner += 5;
        if (poem.poem.author.toLowerCase().includes(q.toLowerCase())) runner += 2;
        if (poem.poem.text.toLowerCase().includes(q.toLowerCase())) runner++;
      })
      
      return runner;
    }
    
    const scores = filteredList.map(poem => {
      poem.score = score(poem, query);
      return poem;
    });

    setRefresh(refresh + 1);
    return scores.sort((a,b) => b.score - a.score);
  }

  // for search bar
  useEffect(() => {
    if (query.current) {
      // decide whether we're looking through all poems or just the ones remaining
      const pool = userpoems;

      // filter list to check it has all the terms in the query
      const filteredList = pool.filter(poem => {
        const hasQs = query.current.trim().split(" ").map(q => {
          return poem.poem.author.toLowerCase().includes(q.toLowerCase()) ||
          poem.poem.text.toLowerCase().includes(q.toLowerCase()) ||
          poem.poem.title.toLowerCase().includes(q.toLowerCase())
        });
        return hasQs.reduce((a,b) => a * b, 1);
      });

      // sort list by where queries appear
      poemsToRender.current = sortFilteredList(filteredList, query.current.trim());

      setSortBy("relevance");
      setFiltered(true);
    }
    else {
      setFiltered(false);
      poemsToRender.current = userpoems;
    }
  }, [query]);

  const handleQuery = e => {
    setQuery({ current: e.target.value, last: query.current });
  }

  const unfilter = () => {
    poemsToRender.current = userpoems;
    setFiltered(false);
    setAuthor();
    setQuery({current:"", last:query.current});
    window.scrollTo(0,0);
  }

  // for sorting
  const comparisons = {
    titlesAZ: (a,b) => a.poem.title.localeCompare(b.poem.title),
    titlesZA: (a,b) => b.poem.title.localeCompare(a.poem.title),
    authorsAZ: (a,b) => a.poem.author.localeCompare(b.poem.author),
    authorsZA: (a,b) => b.poem.author.localeCompare(a.poem.author),
    newestFirst: (a,b) => b.poem.poemid - a.poem.poemid,
    oldestFirst: (a,b) => a.poem.poemid - b.poem.poemid,
    relevance: (a,b) => b.score - a.score,
  }

  const handleSort = e => {
    setSortBy(e.target.value);
    setRefresh(refresh + 1);
    window.scrollTo(0,0);
  }

  const changePerPage = e => {
    setPerPage(e.target.value);
    setRefresh(refresh + 1);
  }

  return (
    username ?
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/my-poems' className={!filtered && 'current'} style={{textDecoration:'none'}} onClick={unfilter}>My Poems</Link>
        {filtered && <Link to='/my-poems' className='current'>{author ? author : 'Search'}</Link>}
      </Breadcrumbs>
      <Container>
        <Section>
          <h2>
            <RedSpan>
              {author ? 
                "Saved Poems by " + author :
                query.current ?
                  `Found ${poemsToRender.current.length} result${poemsToRender.current.length === 1 ? '': 's'}:` :
                  username.slice(0,1).toUpperCase() + username.slice(1) + "'s Poems"}
            </RedSpan>
          </h2>
          {error &&
            <Toast
              variant={error.variant}
              onClick={() => setError(false)}
            >
              {error.message}
            </Toast>}
          <div style={{display:"flex", flexFlow:"row wrap", justifyContent:"space-evenly", alignItems:"center", width:"100%"}}>
            {<label htmlFor="sortby" style={{display:"block", width:"auto", visibility:poemsToRender.current.length > 3 ? "visible" : "hidden"}}>
              Sort by:&nbsp;
              <select name="sortby" id="sortby" value={sortBy} onChange={handleSort}>
                {query.current && <option value={'relevance'}>Relevance</option>}
                <option value={'newestFirst'}>Newest first</option>
                <option value={'oldestFirst'}>Oldest first</option>
                <option value={'titlesAZ'}>Titles, A to Z</option>
                <option value={'titlesZA'}>Titles, Z to A</option>
                <option value={'authorsAZ'}>Authors, A to Z</option>
                <option value={'authorsZA'}>Authors, Z to A</option>
              </select>
            </label>}
            {(poemsToRender.current.length > 6 || query.current) && 
              <TextInput 
                label="Search:&nbsp;"
                name="search"
                placeholder="Find poem..."
                type="text"
                variant="horizontal"
                value={query.current}
                onChange={handleQuery}
              />}
            {<label htmlFor="perPage" style={{display:"block", width:"auto", visibility: poemsToRender.current.length > 6 ? "visible" : "hidden"}}>
              Poems per page:&nbsp;
              <select name="perPage" id="perPage" value={perPage} onChange={changePerPage}>
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
                <option value={60}>60</option>
              </select>
            </label>}
            
          </div>
          {poemsToRender.current.length ? 
          <div>
            {!loading && 
              <Paginator
                data={poemsToRender.current.sort(comparisons[sortBy])}
                perPage={perPage}
                Item={PoemTile}
                getRhymes={getRhymes}
                getMeter={getMeter}
                getCurrentUser={getCurrentUser}
                fetchCurrentUser={fetchCurrentUser}
                filterPoemsByAuthor={filterPoemsByAuthor}
                filtered={filtered}
                setRefresh={setRefresh}
                refresh={refresh}
                setLoading={setLoading}
              />
            }
          </div>
          : <div className='paragraph'>
            {filtered
            ? <>
                <p><em>None of your saved poems match</em> <strong>{query.current}</strong>.</p>
              </>
            : <>
                <p><em>You haven't saved any poems!</em></p>
                <Button onClick={() => history.push('/')} style={{width:"100%", margin:"0"}}>Get Started</Button>
              </>}
              
            </div>}
          {filtered && 
            <Button onClick={unfilter} size="small">Remove filter</Button>}
          {loading && <Spinner />}
        </Section>
      </Container>
    </div>
    :
    <Login uri="/my-poems" />
  )
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username,
    userpoems: state.currentUser.poems,
    error: state.toastError,
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter, getCurrentUser, setError })(UserPoems)
