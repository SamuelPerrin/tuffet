import React from 'react';
import {connect} from 'react-redux';

import {YellowSpan, RedSpan} from './styled/Spans';
import Container from './styled/Container';
import Section from './styled/Section';
import StanzaTile from './styled/StanzaTile';
import {Link} from 'react-router-dom';
import Anthology from '../utils/Anthology';
import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import {RHYME_SCHEMES, RHYME_TYPES} from '../utils/phonstants';

const Rhymes = props => {
  let {poems, rhymes, rhymeTypeCounts, rhymeSchemeCounts} = props;

  return (
    <div>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Schemes</RedSpan></h3>
          {poems.map(poem => new Poem(poem).getStanzas().map(stanza => <StanzaTile children={new Stanza(stanza).getLines()} />))}
          <p>The most common rhyme schemes in this sample are:</p>
          <ol>
            {rhymeSchemeCounts && Object.entries(rhymeSchemeCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <li key={entry[0]}>{RHYME_SCHEMES[entry[0]]} ({entry[1]} stanza{entry[1] > 0 ? 's' : ''})</li>)}
          </ol>
          <Link to="/rhyme/scheme"><RedSpan>Read more »</RedSpan></Link>
        </Section>
        <Section>
          <h3><YellowSpan>Rhymes by Type</YellowSpan></h3>
          <p>The most common rhyme-types in this sample are:</p>
          <ol>
            {rhymeTypeCounts && Object.entries(rhymeTypeCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <li key={entry[0]}>{RHYME_TYPES[entry[0]]} ({entry[1]} rhyme{entry[1] > 0 ? 's' : ''})</li>)}
          </ol>
          <Link href="#"><YellowSpan>Read more »</YellowSpan></Link>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  ...state,
  poems: new Anthology(state.poetry).getPoems(),
  rhymes: state.rhymes,
  rhymeTypeCounts: state.rhymeTypeCounts,
  rhymeSchemeCounts: state.rhymeSchemeCounts,
  }
}


export default connect(mapStateToProps)(Rhymes)
