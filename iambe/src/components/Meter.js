import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan} from './styled/Spans';
import StanzaTile from './styled/StanzaTile';
import Button from './styled/Button';
import {Link, useHistory} from 'react-router-dom';

import {getLineMeterDetails, getRhymes } from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';

const Meter = props => {
  const { poetry, poems, stanzaMeterCounts, getLineMeterDetails, getRhymes} = props;
  const history = useHistory();

  const submitLineMeterDetail = e => {
    e.preventDefault();
    getLineMeterDetails(e.target.attributes.stanzaNum.value);
    history.push("/meter/scansion");
  }

  const goToRhymes = e => {
    e.preventDefault();
    getRhymes(poetry);
    history.push("/rhyme");
  }

  let stanzaNum = -1;

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);


  return (
    <div>
      <Breadcrumbs>
        <Link to='/' key='Home'>Home</Link>
        <Link to='/meter' key='Meter' className='current'>Meter</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><YellowSpan>Stanzas by Meter</YellowSpan></h3>
          {Object.entries(stanzaMeterCounts).reduce((a,b) => a+b[1], 0) > 1 ? <p>The most common meters in this sample are:</p> : <p>This stanza's meter is:</p>}
          <ol>
            {stanzaMeterCounts && Object.entries(stanzaMeterCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <li key={entry[0]}>{entry[0]} ({entry[1]} stanza{entry[1] > 1 ? 's' : ''})</li>)}
          </ol>
          <Link to="/meter/scansion"><YellowSpan>Read more »</YellowSpan></Link>
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
        </Section>
        <Button onClick={goToRhymes}>Get Rhymes</Button>
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

export default connect(mapStateToProps, { getLineMeterDetails, getRhymes })(Meter)
