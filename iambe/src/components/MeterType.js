import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import Table from './styled/Table';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import Line from '../utils/Line';

const MeterType = props => {
  const {mt, stanzaNum, poems} = props;

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));

  const lines = new Stanza(stanzaList[stanzaNum]).getLines();
  const lineMeterCounts = {}
  lines.forEach(line => {
    const meterLabel = new Line(line).getMeterLabelPhrase();
    lineMeterCounts[meterLabel] = meterLabel in lineMeterCounts ? lineMeterCounts[meterLabel] + 1 : 1;
  })

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/scansion'>Scansion</Link>
        <Link to='/meter/type' className='current'>Meter Type</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><RedSpan>Meter: {mt}</RedSpan></h3>
          <Table maxWidth='1200px'>
            <caption>This stanza has {lineMeterCounts[mt]} instance{lineMeterCounts[mt] === 1 ? '' : 's'} of {mt}:</caption>
            <thead>
              <tr>
                <th>Line</th>
                <th>Meter</th>
              </tr>
            </thead>
            <tbody>
              {lines.map(line => [line, new Line(line).getMeterLabelPhrase()]).filter(x => x[1] === mt).map(line => (
                <tr key={line[0]}>
                  <td>{line[0]}</td>
                  <td>{line[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <Section>
          <h3><YellowSpan>What is {mt}?</YellowSpan></h3>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state,
  mt: state.mt,
  stanzaNum: state.stanzaNum,
  poems: state.poems,
})

export default connect(mapStateToProps, {})(MeterType);
