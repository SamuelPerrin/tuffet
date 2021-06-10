import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan} from './styled/Spans';
import ScannedLine from './styled/ScannedLine';
import Button from './styled/Button';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import Line from '../utils/Line';

const MeterLine = props => {
  const {poems, stanzaNum, lineNum} = props;
  const history = useHistory();

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
  const stanza = new Stanza(stanzaList[stanzaNum]);
  const line = stanza.getLines()[lineNum];
  const marks = new Line(line).getMarkString();

  const goBack = e => {
    e.preventDefault();
    history.push('/meter/scansion')
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

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
          <Button onClick={goBack}>Back to stanza</Button>
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
