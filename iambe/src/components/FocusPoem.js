import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import FlexRow from './styled/FlexRow';
import Container from './styled/Container';
import Section from './styled/Section';
import { BlueSpan, YellowSpan, RedSpan } from './styled/Spans';
import PoemBox from './styled/PoemBox';
import StanzaTile from './styled/StanzaTile';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';

import { getRhymes, getMeter } from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import { GRAY } from '../constants/colors';

const FocusPoem = props => {
  const { currentUser, getRhymes, getMeter } = props;
  const { poemid } = useParams();
  const history = useHistory();
  const userData = useRef(currentUser);
  const filteredPoemList = userData.current.poems.filter(p => p.poem.poemid == poemid);
  const poem = useRef(filteredPoemList.length ? filteredPoemList[0].poem : {author:"", title:"", text:""});

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const handleClick = (text, destination) => {
    if (destination === '/rhyme') getRhymes(text);
    else getMeter(text);

    history.push(destination);
  }

  return (
    poem.current.text ?
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/my-poems'>My Poems</Link>
        <Link to='' className='current'>Poem</Link>
      </Breadcrumbs>
      <FlexRow>
        <Container>
          <Section>
            {poem.current.title && 
              <h2><BlueSpan>{poem.current.title}</BlueSpan></h2>
            }
            {(poem.current.author || poem.current.year) && 
              <h3>
                <em style={{color: GRAY}}>by&nbsp;</em>
                <YellowSpan>{poem.current.author || "Anonymous"} {poem.current.year ? `(${poem.current.year})` : null}</YellowSpan>
              </h3>
            }
            <PoemBox>
              {new Poem(poem.current.text)
                .getStanzas()
                .map(stanza => <StanzaTile children={new Stanza(stanza).getLines()} key={stanza} style={{cursor:"auto"}}/>)
              }
            </PoemBox>
            <ButtonRow>
              <Button onClick={() => handleClick(poem.current.text, '/rhyme')} size="small">Get Rhymes</Button>
              <Button onClick={() => handleClick(poem.current.text, '/meter')} size="small">Get Meter</Button>
            </ButtonRow>
          </Section>
        </Container>
        {
          poem.current.notes &&
          <Container>
            <Section>
              <h2><RedSpan>Notes</RedSpan></h2>
              <div className='paragraph'>
                {poem.current.notes.split('\n').map(p => <p key={p}>{p}</p>)}
              </div>
            </Section>
          </Container>
        }
      </FlexRow>
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
  }
}

export default connect(mapStateToProps, {getRhymes, getMeter})(FocusPoem);
// export default FocusPoem;
