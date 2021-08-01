import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRhymes, getMeter, getCurrentUser } from '../actions';
import { fetchCurrentUser } from '../api-client/auth';

import Login from './Login';
import { RedSpan, YellowSpan } from './styled/Spans';
import Container from './styled/Container';
import Section from './styled/Section';
import PoemTile from './styled/PoemTile';
import Button from './styled/Button';

const UserPoems = props => {
  const { username, userpoems, getRhymes, getMeter, getCurrentUser } = props;
  const history = useHistory();
  const poemsToRender = useRef(userpoems);
  const [filtered, setFiltered] = useState();
  const [author, setAuthor] = useState();
  const [sortBy, setSortBy] = useState('titlesAZ');

  useEffect(() => {
    poemsToRender.current = userpoems;
    setFiltered(false);
  }, []);

  const filterPoemsBy = e => {
    e.preventDefault();
    const filterAuthor = e.target.innerHTML;
    setAuthor(filterAuthor);
    const filtered = userpoems.filter(poem => filterAuthor === "Anonymous" ? poem.poem.author === "" : poem.poem.author === filterAuthor);
    poemsToRender.current = filtered;
    setFiltered(true);
  }

  const unfilter = () => {
    poemsToRender.current = userpoems;
    setFiltered(false);
  }

  const comparisons = {
    titlesAZ: (a,b) => a.poem.title.localeCompare(b.poem.title),
    titlesZA: (a,b) => b.poem.title.localeCompare(a.poem.title),
    authorsAZ: (a,b) => a.poem.author.localeCompare(b.poem.author),
    authorsZA: (a,b) => b.poem.author.localeCompare(a.poem.author),
    newestFirst: (a,b) => b.poem.poemid - a.poem.poemid,
    oldestFirst: (a,b) => a.poem.poemid - b.poem.poemid,
  }

  const handleSort = e => {
    setSortBy(e.target.value);
  }

  return (
    username ?
    <div>
      <Container>
        <Section>
          <h2>
            <RedSpan>
              {filtered ? "Saved Poems by " + author : username.slice(0,1).toUpperCase() + username.slice(1) + "'s Poems"}
            </RedSpan>
          </h2>
          <div>
            <label htmlFor="sortby">Sort by:&nbsp;</label>
            <select name="sortby" id="sortby" value={sortBy} onChange={handleSort}>
              <option value={'newestFirst'}>Newest first</option>
              <option value={'oldestFirst'}>Oldest first</option>
              <option value={'titlesAZ'}>Titles, A to Z</option>
              <option value={'titlesZA'}>Titles, Z to A</option>
              <option value={'authorsAZ'}>Authors, A to Z</option>
              <option value={'authorsZA'}>Authors, Z to A</option>
            </select>
          </div>
          {poemsToRender.current.length ? 
          <div style={{display:"flex", flexFlow:"row wrap", justifyContent:"space-evenly"}}>
            {poemsToRender.current.length && poemsToRender.current.sort(comparisons[sortBy]).map(poem => (
              <PoemTile
                poem={poem.poem}
                getRhymes={getRhymes}
                getMeter={getMeter}
                key={poem.poem.text}
                getCurrentUser={getCurrentUser}
                fetchCurrentUser={fetchCurrentUser}
                filterPoemsBy={filterPoemsBy}
                filtered={filtered}
              />
            ))}
          </div>
          : <div className='paragraph'>
              <p><em>{filtered ? "" :"You haven't saved any poems!"}</em></p>
              <Button onClick={() => history.push('/')} style={{width:"100%", margin:"0"}}>Get Started</Button>
            </div>}
          {filtered && 
            <Button onClick={unfilter} size="small">Remove filter</Button>}
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
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter, getCurrentUser })(UserPoems)
