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
  let {poems, rhymes, rhymeCounts} = props;

  return (
    <div>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Schemes</RedSpan></h3>
          {poems.map(poem => {
            return new Poem(poem).getStanzas().map(stanza => {
              return <StanzaTile children={new Stanza(stanza).getLines()} />
          })
            })}
          {/* <p>Rhyme Scheme for this stanza: {rs}</p> */}
          <Link to="/rhyme/scheme"><RedSpan>Read more »</RedSpan></Link>
        </Section>
        <Section>
          <h3><YellowSpan>Rhymes by Type</YellowSpan></h3>
          <p>The most common rhyme-types in this sample are:</p>
          <ol>
            {rhymeCounts && Object.entries(rhymeCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1]-a[1]).map(entry => <li key={entry[0]}>{RHYME_TYPES[entry[0]]} ({entry[1]} rhyme{entry[1] > 0 ? 's' : ''})</li>)}
          </ol>
          <Link href="#"><YellowSpan>Read more »</YellowSpan></Link>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(`in mapStateToProps with ${state.rhymes.rt}`)
  return {
  ...state,
  poems: new Anthology(state.poetry).getPoems(),
  rhymes: state.rhymes,
  rhymeCounts: state.rhymeCounts,
  }
}


export default connect(mapStateToProps)(Rhymes)
