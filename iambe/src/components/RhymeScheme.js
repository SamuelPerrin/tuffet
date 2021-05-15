import React from 'react';
import {connect} from 'react-redux';

import Anthology from '../utils/Anthology';
import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';

import Container from './styled/Container';
import Section from './styled/Section';
import {BlueSpan, RedSpan} from './styled/Spans';
import StanzaTile from './styled/StanzaTile';

import {RHYME_SCHEMES} from '../utils/phonstants';

const RhymeScheme = props => {
  const {poems, rhymes, stanzaNum} = props;

  const stanzaRhymeList = [];
  rhymes.forEach(poem => poem.forEach(stanza => stanzaRhymeList.push(stanza)));

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));

  const stanza = new Stanza(stanzaList[stanzaNum]);

  return (
    <div>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Scheme</RedSpan></h3>
          <StanzaTile children={stanza.getLines()} />
          <p>This stanza's rhyme scheme is: <BlueSpan>{RHYME_SCHEMES[stanza.getRhymeScheme()]}</BlueSpan>.</p>
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
    stanzaNum: state.stanzaNum,
  }
}

export default connect(mapStateToProps, {})(RhymeScheme)
