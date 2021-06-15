import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {BlueSpan, RedSpan, YellowSpan} from './styled/Spans';
import RhymedStanza from './styled/RhymedStanza';
import Table from './styled/Table';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';

import {crement} from '../actions';

import { RHYME_TYPES, RHYME_SCHEMES } from '../utils/phonstants';

const RhymeScheme = props => {
  const {poems, rhymes, stanzaNum, crement} = props;
  const history = useHistory();

  const stanzaRhymeList = [];
  rhymes.forEach(poem => poem.forEach(stanza => stanzaRhymeList.push(stanza)));
  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
  const stanza = new Stanza(stanzaList[stanzaNum]);
  const stanzaRhymes = stanza.getRhymes();

  const submitCrement = dir => crement(dir,'stanzaNum');
  const goBack = () => history.push('/rhyme');
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme'>Rhyme</Link>
        <Link to='/rhyme/scheme' className='current'>Rhyme scheme</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Scheme</RedSpan></h3>
          <RhymedStanza stanza={stanza.getLines()}/>
          <br/>
          <p>This stanza's rhyme scheme is: <BlueSpan>{RHYME_SCHEMES[stanza.getRhymeScheme()]}</BlueSpan>.</p>
        </Section>
        <Section>
          <h3><YellowSpan>Rhymes</YellowSpan></h3>
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
                <tr key={rhyme.lines[0]}>
                  <td>{rhyme.words[0]}</td>
                  <td>{rhyme.words[1]}</td>
                  <td>{RHYME_TYPES[rhyme.rt]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <ButtonRow>
          {stanzaNum != 0 &&
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
          {stanzaNum != stanzaList.length - 1 &&
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
