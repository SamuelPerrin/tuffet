import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import { axiosWithAuth, fetchCurrentUser } from '../api-client/auth';

import Breadcrumbs from './styled/Breadcrumbs';
import FlexRow from './styled/FlexRow';
import Container from './styled/Container';
import Section from './styled/Section';
import { BlueSpan, YellowSpan, RedSpan } from './styled/Spans';
import PoemBox from './styled/PoemBox';
import StanzaTile from './styled/StanzaTile';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';
import TextArea from './styled/TextArea';
import Toast from './styled/Toast';

import { getRhymes, getMeter, setError, getCurrentUser } from '../actions';

import Poem from '../utils/Poem';
import { GRAY } from '../constants/colors';

const FocusPoem = props => {
  const { currentUser, toastError, getRhymes, getMeter, setError, getCurrentUser } = props;
  const { poemid } = useParams();
  const history = useHistory();
  const userData = useRef(currentUser);
  const filteredPoemList = userData.current.poems.filter(p => p.poem.poemid == poemid);
  const poem = useRef(filteredPoemList.length ? filteredPoemList[0].poem : {author:"", title:"", text:"", publication:"", notes:""});
  const [notes, setNotes] = useState(poem.current.notes ? poem.current.notes : "");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const handleClick = (text, destination) => {
    if (destination === '/rhyme') getRhymes(text);
    else getMeter(text);

    history.push(destination);
  }

  const handleChange = e => {
    setNotes(e.target.value);
  }

  const handleSave = async () => {
    const newPoem = poem.current;
    newPoem.notes = notes;
    await axiosWithAuth()
      .put(`/poems/poem/${poemid}`, newPoem)
      .then(async _ => {
        getCurrentUser(await fetchCurrentUser());
        window.scroll(0,0);
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) setError("You might need to log in!");
        else setError("Something went wrong with saving your notes!");
      })
  }

  return (
    poem.current.text ?
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/my-poems'>My Poems</Link>
        <Link to='' className='current'>Poem</Link>
      </Breadcrumbs>
      <FlexRow style={{justifyContent:"center"}}>
        <Container>
          <Section>
            {poem.current.title && 
              <h2><BlueSpan>{poem.current.title}</BlueSpan></h2>
            }
            {(poem.current.author || poem.current.publication) && 
              <h3>
                <em style={{color: GRAY}}>by&nbsp;</em>
                <YellowSpan>{poem.current.author || "Anonymous"} {poem.current.publication ? `(${poem.current.publication})` : null}</YellowSpan>
              </h3>
            }
            <PoemBox>
              {new Poem(poem.current.text)
                .getStanzas()
                .map(stanza => <StanzaTile children={stanza.getLines().map(l => l.text)} key={stanza.text} style={{cursor:"auto"}}/>)
              }
            </PoemBox>
            <ButtonRow>
              <Button onClick={() => handleClick(poem.current.text, '/rhyme')} size="small">Get Rhymes</Button>
              <Button onClick={() => handleClick(poem.current.text, '/meter')} size="small">Get Meter</Button>
            </ButtonRow>
          </Section>
        </Container>

        <Container>
          <Section>
            <h2><RedSpan>Notes</RedSpan></h2>
            <div className='paragraph'>
              <p style={{margin:"0"}}>Enter notes about this poem in the field below.</p>
            </div>
            <TextArea
              onChange={handleChange}
              name='notes'
              type='text'
              value={notes}
              placeholder={`Notes on "${poem.current.title ? poem.current.title : "this poem"}"`}
              variant="no-clear"
            />
            <Button size="small" onClick={handleSave}>Save notes</Button>
          </Section>
        </Container>
      </FlexRow>

      {(toastError || success) && 
        <Toast
          variant={toastError ? 'danger' : 'success'}
          onClick={() => toastError ? setError(false) : setSuccess(false)}
        >
          {toastError ? toastError: "Your notes have been saved."}
        </Toast>
      }
    </div>
    :
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/my-poems'>My Poems</Link>
        <Link to='' className='current'>Poem Not Found</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>Poem not found.</RedSpan></h2>
        </Section>
      </Container>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    toastError: state.toastError,
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter, setError, getCurrentUser })(FocusPoem);
// export default FocusPoem;
