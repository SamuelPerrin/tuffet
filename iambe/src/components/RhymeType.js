import React from 'react';
import {connect} from 'react-redux';

import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import Table from './styled/Table';
import { RHYME_TYPES, RHYME_TYPE_DESCRIPTIONS } from '../utils/phonstants';

const RhymeType = props => {
  const {rhymes, rt, rhymeTypeCounts} = props;
  const rhymeList = [];
  rhymes.forEach(poem => poem.forEach(stanza => stanza.forEach(rhyme => rhymeList.push(rhyme))));

  return (
    <div>
      <Container>
        <Section>
          <h3><YellowSpan>Rhyme Type: {RHYME_TYPES[rt]}</YellowSpan></h3>
          <Table maxWidth={'1200px'}>
            <caption>This selection has {rhymeTypeCounts[rt]} instance{rhymeTypeCounts[rt] === 1 ? '' : 's'} of {RHYME_TYPES[rt]}:</caption>
            <thead>
              <tr>
                <th>Word 1</th>
                <th>Word 2</th>
                <th>Line 1</th>
                <th>Line 2</th>
              </tr>
            </thead>
            <tbody>
              {rhymeList.filter(rhyme => rhyme.rt === rt).map(rhyme => (
                <tr key={rhyme.lines[0]}>
                  <td>{rhyme.words[0]}</td>
                  <td>{rhyme.words[1]}</td>
                  <td>{rhyme.lines[0]}</td>
                  <td>{rhyme.lines[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <Section>
          <h3><RedSpan>What is {RHYME_TYPES[rt]}?</RedSpan></h3>
            {RHYME_TYPE_DESCRIPTIONS[rt]}
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state,
  rhymes: state.rhymes,
  rhymeTypeCounts: state.rhymeTypeCounts,
  rt: state.rt,
})

export default connect(mapStateToProps, {})(RhymeType);