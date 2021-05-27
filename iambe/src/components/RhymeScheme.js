import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Anthology from '../utils/Anthology';
import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';

import Navbar from './styled/Navbar';
import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {BlueSpan, RedSpan} from './styled/Spans';
import RhymedStanza from './styled/RhymedStanza';

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
      <Navbar />
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme'>Rhyme</Link>
        <Link to='/rhyme/scheme' className='current'>Rhyme scheme</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Scheme</RedSpan></h3>
          <RhymedStanza stanza={stanzaList[stanzaNum].split('\n')}/>
          <br/>
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
