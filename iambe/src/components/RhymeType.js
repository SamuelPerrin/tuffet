import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan, RedSpan } from './styled/Spans';
import Table from './styled/Table';
import Button from './styled/Button';

import { RHYME_TYPES } from '../utilsTS/phonstants';
import { RHYME_TYPE_DESCRIPTIONS } from '../utils/descriptions';

const RhymeType = props => {
  const {rhymes, rt, rhymeTypeCounts} = props;
  const history = useHistory();

  const goBack = () => history.push('/rhyme')

  if (!!rhymes) {
    var rhymeList = [];
    rhymes.forEach(poem => poem.forEach(stanza => stanza.forEach(rhyme => rhymeList.push(rhyme))));
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  if (!rhymes) return <Redirect to='/' />
  else return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme'>Rhyme</Link>
        <Link to='/rhyme/type' className='current'>{RHYME_TYPES[rt]}</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><YellowSpan>Rhyme Type: <a href={'#'+RHYME_TYPES[rt]}>{RHYME_TYPES[rt]}</a></YellowSpan></h2>
          <Table maxWidth={'1200px'}>
            <caption style={{textAlign:'center'}}>
              This selection has {rhymeTypeCounts[rt]} instance{rhymeTypeCounts[rt] === 1 ? '' : 's'} of {RHYME_TYPES[rt]}:
            </caption>
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
          <h2 id={RHYME_TYPES[rt]}><RedSpan>What is {RHYME_TYPES[rt]}?</RedSpan></h2>
            {RHYME_TYPE_DESCRIPTIONS[rt]}
        </Section>
        <Button onClick={goBack} size="small">Back to Rhymes</Button>
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