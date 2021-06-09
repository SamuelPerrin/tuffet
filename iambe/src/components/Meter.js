import React from 'react';
import {connect} from 'react-redux';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import StanzaTile from './styled/StanzaTile';
import {Link, useHistory} from 'react-router-dom';

import {getLineMeterDetails} from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';

const Meter = props => {
  const { poems, stanzaMeterCounts, getLineMeterDetails} = props;
  const history = useHistory();

  const submitLineMeterDetail = e => {
    e.preventDefault();
    getLineMeterDetails(e.target.attributes.stanzaNum.value);
    history.push("/meter/scansion");
  }

  let stanzaNum = -1;

  return (
    <div>
      <Breadcrumbs>
        <Link to='/' key='Home'>Home</Link>
        <Link to='/meter' key='Meter' className='current'>Meter</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><YellowSpan>Stanzas by Meter</YellowSpan></h3>
          <div>
            {poems.map(poem => new Poem(poem).getStanzas().map(stanza => {
                  stanzaNum++
                  const thisStanza = new Stanza(stanza)
                  return <StanzaTile 
                    onClick={submitLineMeterDetail}
                    children={thisStanza.getLines()} 
                    hoverText={"Meter: " + thisStanza.getMeter()}
                    key={stanzaNum}
                    stanzaNum={stanzaNum}
                  />
                }
              ))}
          </div>
          {Object.entries(stanzaMeterCounts).reduce((a,b) => a+b[1], 0) > 1 ? <p style={{fontWeight:'bold'}}>The most common meters in this sample are:</p> : <p style={{fontWeight:'bold'}}>This stanza's meter is:</p>}
          <ol>
            {stanzaMeterCounts && Object.entries(stanzaMeterCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <li key={entry[0]}>{entry[0]} ({entry[1]} stanza{entry[1] > 1 ? 's' : ''})</li>)}
          </ol>
          <Link to="/meter/scansion"><YellowSpan>Read more »</YellowSpan></Link>
        </Section>
        <Section>
          <h3><RedSpan>Stanzas by Verse Form</RedSpan></h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Link to="#"><RedSpan>Read more »</RedSpan></Link>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  poetry: state.poetry,
  poems: state.poems,
  stanzaMeters: state.stanzaMeters,
  stanzaMeterCounts: state.stanzaMeterCounts,
})

export default connect(mapStateToProps, {getLineMeterDetails})(Meter)
