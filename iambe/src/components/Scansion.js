import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import ScannedStanza from './styled/ScannedStanza';

const Scansion = props => {
  const {poems, stanzaNum, stanzaMeters} = props;

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
  const stanza = new Stanza(stanzaList[stanzaNum]);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/scansion' className='current'>Scansion</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><RedSpan>Scansion</RedSpan></h3>
          <ScannedStanza stanza={stanza} />
          <br/>
          <p>This stanza's meter is: <RedSpan>{stanza.getMeter()}</RedSpan>.</p>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
    poems: state.poems,
    stanzaMeters: state.stanzaMeters,
    stanzaNum: state.stanzaNum,
  }
}

export default connect(mapStateToProps, {})(Scansion)
