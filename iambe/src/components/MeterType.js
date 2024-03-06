import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import Table from './styled/Table';
import Button from './styled/Button';

import Poem from '../utils/Poem';
import { LINE_METER_DESCRIPTIONS } from '../utils/descriptions';

const MeterType = props => {
  const {mt, stanzaNum, poems} = props;
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  
  const goBack = () => {
    history.push('/meter/scansion');
  }

  if (!!poems) {
    var stanzaList = poems.map(poem => new Poem(poem).getStanzas()).flat();
  
    var lines = stanzaList[stanzaNum].getLines();
    var lineMeterCounts = {}
    lines.forEach(line => {
      const meterLabel = line.getMeter().getSummary();
      lineMeterCounts[meterLabel] = meterLabel in lineMeterCounts ? lineMeterCounts[meterLabel] + 1 : 1;
    })
  }

  if (!poems) return <Redirect to='/' />
  else return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/scansion'>Stanza</Link>
        <Link to='/meter/type' className='current'>Type</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>Meter: <a href={'#' + mt}>{mt}</a></RedSpan></h2>
          <Table maxWidth='1200px'>
            <caption style={{textAlign:'center'}}>
              This stanza has {lineMeterCounts[mt]} instance{lineMeterCounts[mt] === 1 ? '' : 's'} of {mt}:
            </caption>
            <thead>
              <tr>
                <th>Line</th>
                <th>Meter</th>
              </tr>
            </thead>
            <tbody>
              {lines.map(line => [line.text, line.getMeter().getSummary()]).filter(x => x[1] === mt).map(line => (
                <tr key={line[0]}>
                  <td>{line[0]}</td>
                  <td>{line[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        {mt in LINE_METER_DESCRIPTIONS && 
          <Section>
            <h2 id={mt}><YellowSpan>What is {mt}?</YellowSpan></h2>
            {LINE_METER_DESCRIPTIONS[mt]}
          </Section>
        }
        <Button onClick={goBack}>Back to Stanza</Button>
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
