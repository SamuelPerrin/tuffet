import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import Poem from '../utils/Poem';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { BlueSpan, RedSpan, YellowSpan } from './styled/Spans';
import RhymedStanza from './styled/RhymedStanza';
import Table from './styled/Table';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';

import { crement } from '../actions';

import { RHYME_TYPES } from '../utils/phonstants';

const RhymeScheme = props => {
  const {poems, rhymes, stanzaNum, crement} = props;
  const history = useHistory();

  if (!!poems) {
    var stanzaRhymeList = [];
    rhymes.forEach(poem => poem.forEach(stanza => stanzaRhymeList.push(stanza)));
    var stanzaList = poems.map(poem => (new Poem(poem)).getStanzas()).flat();
    var stanza = stanzaList[stanzaNum];
    var stanzaRhymes = stanza.getRhymes();
  }

  const submitCrement = dir => {
    window.scrollTo(0,0);
    crement(dir,'stanzaNum');
  }
  const goBack = () => history.push('/rhyme');
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  if (!poems) return <Redirect to='/' />
  else return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme'>Rhyme</Link>
        <Link to='/rhyme/scheme' className='current'>Rhyme scheme</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>Rhyme Scheme</RedSpan></h2>
          <RhymedStanza stanza={stanza.getLines().map(l => l.text)}/>
          <br/>
          <div className='paragraph'>
            <p>This stanza's rhyme scheme is: <BlueSpan>{stanza.getRhymeScheme()}</BlueSpan>.</p>
          </div>
        </Section>
        <Section>
          <h2><YellowSpan>Rhymes</YellowSpan></h2>
          <Table maxWidth={'1200px'}>
            <caption>This stanza has {stanzaRhymes.length} rhyme{stanzaRhymes.length === 1 ? '' : 's'}:</caption>
            <thead>
              <tr>
                <th>Word 1</th>
                <th>Word 2</th>
                <th>Rhyme Type</th>
              </tr>
            </thead>
            <tbody>
              {stanzaRhymes.map(rhyme => (
                <tr key={rhyme.line1.text}>
                  <td>{rhyme.term1}</td>
                  <td>{rhyme.term2}</td>
                  <td>{RHYME_TYPES[rhyme.rhymeType]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <ButtonRow>
          {stanzaNum > 0 &&
          <Button
            size='small'
            onClick={() => submitCrement('de')}
          >
            ᐊ
          </Button>}
          <Button
            // size='small'
            onClick={goBack}
          >
            Back to Rhymes
          </Button>
          {stanzaNum < stanzaList.length - 1 &&
          <Button
            size='small'
            onClick={() => submitCrement('in')}
          >
            ᐅ
          </Button>}
        </ButtonRow>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
    poems: state.poems,
    rhymes: state.rhymes,
    stanzaNum: state.stanzaNum,
  }
}

export default connect(mapStateToProps, {crement})(RhymeScheme)
