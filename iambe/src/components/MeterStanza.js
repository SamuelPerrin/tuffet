import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan, RedSpan } from './styled/Spans';
import Table from './styled/Table';
import Button from './styled/Button';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import { STANZA_METER_DESCRIPTIONS } from '../utils/descriptions';

const MeterStanza = props => {
  const {stanzaType, poems} = props;
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const goBack = () => {
    history.push("/meter");
  }

  if (!!poems) {
    var stanzaList = [];
    poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(new Stanza(stanza))))
    
    stanzaList = stanzaList.filter(stanza => stanza.getMeter() === stanzaType);
  }

  if (!poems) return <Redirect to='/' />
  else return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/stanza' className='current'>Stanza</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>Meter: {stanzaType}</RedSpan></h2>
          <Table maxWidth='1200px'>
            <caption style={{textAlign:'center'}}>
              This sample has {stanzaList.length} stanza{stanzaList.length === 1 ? '' : 's'} of {stanzaType}:
            </caption>
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
          <h2><YellowSpan>What is {stanzaType}?</YellowSpan></h2>
          {STANZA_METER_DESCRIPTIONS[stanzaType]}
        </Section>
        <Button onClick={goBack}>Back to Meter</Button>
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
