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
import { STANZA_METER_DESCRIPTIONS } from '../utils/phonstants';

const MeterStanza = props => {
  const {stanzaType, poems} = props;

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  let stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(new Stanza(stanza))))
  
  console.log(`stanzaList`, stanzaList);
  stanzaList = stanzaList.filter(stanza => stanza.getMeter() === stanzaType);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/stanza' className='current'>Stanza</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><RedSpan>Meter: {stanzaType}</RedSpan></h3>
          <Table maxWidth='1200px'>
            <caption>This sample has {stanzaList.length} instance{stanzaList.length === 1 ? '' : 's'} of {stanzaType}:</caption>
            <thead>
              <tr>
                <th>Stanza's 1st Line</th>
                <th>Meter</th>
              </tr>
            </thead>
            <tbody>
              {stanzaList.map(stanza => (
                <tr key={stanza.getLines()[0]}>
                  <td>{stanza.getLines()[0]}</td>
                  <td>{stanzaType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <Section>
          <h3><YellowSpan>What is {stanzaType}?</YellowSpan></h3>
          {STANZA_METER_DESCRIPTIONS[stanzaType]}
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state,
  stanzaType: state.stanzaType,
  poems: state.poems,
})

export default connect(mapStateToProps, {})(MeterStanza);
