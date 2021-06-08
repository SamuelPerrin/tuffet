import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import ScannedLine from './styled/ScannedLine';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import Line from '../utils/Line';

const MeterLine = props => {
  const {poems, stanzaMeters, stanzaNum, lineNum} = props;

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
  const stanza = new Stanza(stanzaList[stanzaNum]);
  const line = stanza.getLines()[lineNum];
  const marks = new Line(line).getMarkString();

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/scansion'>Scansion</Link>
        <Link to='/meter/line' className='current'>Line</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><YellowSpan>Scansion</YellowSpan></h3>
          <p>This line can be scanned as follows:</p>
          <ScannedLine marks={marks} line={line} />

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
    lineNum: state.lineNum,
  }
}

export default connect(mapStateToProps, {})(MeterLine)
