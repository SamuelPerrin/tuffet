import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import { YellowSpan, RedSpan } from './styled/Spans';
import Container from './styled/Container';
import Section from './styled/Section';
import StanzaTile from './styled/StanzaTile';
import ListItemTile from './styled/ListItemTile';
import Button from './styled/Button';
import { getRhymeSchemeDetails, getRhymeTypeDetails, getMeter } from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import { RHYME_SCHEMES, RHYME_TYPES } from '../utils/phonstants';

const Rhymes = props => {
  let {poetry, poems, rhymeTypeCounts, rhymeSchemeCounts, getRhymeSchemeDetails, getRhymeTypeDetails, getMeter} = props;
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const submitRhymeDetail = e => {
    e.preventDefault();
    getRhymeSchemeDetails(e.target.attributes.stanzaNum.value);
    history.push("/rhyme/scheme");
  }

  const submitRhymeType = e => {
    e.preventDefault();
    getRhymeTypeDetails(e.target.dataset.rt);
    history.push("/rhyme/type");
  }

  const goToMeter = e => {
    e.preventDefault();
    getMeter(poetry);
    history.push("/meter");
  }

  let stanzaNum = -1;

  if (Object.keys(rhymeTypeCounts).reduce((a,b) => a + rhymeTypeCounts[b], 0) === 0) {
    return (
      <div>
        <Breadcrumbs>
          <Link to='/'>Home</Link>
          <Link to='/rhyme' className='current'>Rhyme</Link>
        </Breadcrumbs>
        <Container>
          <Section>
            <h3><YellowSpan>Oops!</YellowSpan></h3>
            <p>No rhymes found. <Link to='/'>Try again</Link> with a different poem.</p>
          </Section>
        </Container>
      </div>
    )
  } else return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme' className='current'>Rhyme</Link>
      </Breadcrumbs>
      <Container>
      <Section>
          <h3><YellowSpan>Rhymes by Type</YellowSpan></h3>
          <p>The most common rhyme-types in this sample are:</p>
          <ol>
            {rhymeTypeCounts && Object.entries(rhymeTypeCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <ListItemTile key={entry[0]} onClick={submitRhymeType} rt={entry[0]}>{RHYME_TYPES[entry[0]]} ({entry[1]} rhyme{entry[1] > 0 ? 's' : ''})</ListItemTile>)}
          </ol>
          <Link to="/rhyme/type"><YellowSpan>Read more »</YellowSpan></Link>
        </Section>
        <Section>
          <h3><RedSpan>Rhyme Schemes</RedSpan></h3>
          {Object.entries(rhymeSchemeCounts).reduce((a,b) => a+b[1], 0) > 1 ? <p>The most common rhyme schemes in this sample are:</p> : <p>This stanza's rhyme scheme is:</p>}
          <ol>
            {rhymeSchemeCounts && Object.entries(rhymeSchemeCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <li key={entry[0]}>{RHYME_SCHEMES[entry[0]]} ({entry[1]} stanza{entry[1] > 1 ? 's' : ''})</li>)}
          </ol>
          <Link to="/rhyme/scheme"><RedSpan>Read more »</RedSpan></Link>
          <div style={{border:'1px solid black',borderRadius:'5px',padding:'1rem',marginTop:'1rem'}}>
            {poems.map(poem => new Poem(poem).getStanzas().map(stanza => {
                stanzaNum++
                return <StanzaTile 
                  onClick={submitRhymeDetail}
                  children={new Stanza(stanza).getLines()} 
                  hoverText={"Rhyme scheme: " + RHYME_SCHEMES[new Stanza(stanza).getRhymeScheme()]}
                  key={stanzaNum}
                  stanzaNum={stanzaNum}
                />
              }
            ))}
          </div>
        </Section>
        <Button onClick={goToMeter}>Get Meter</Button>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  ...state,
  poetry: state.poetry,
  poems: state.poems,
  rhymes: state.rhymes,
  rhymeTypeCounts: state.rhymeTypeCounts,
  rhymeSchemeCounts: state.rhymeSchemeCounts,
  }
}

export default connect(mapStateToProps, { getRhymeSchemeDetails, getRhymeTypeDetails, getMeter })(Rhymes)