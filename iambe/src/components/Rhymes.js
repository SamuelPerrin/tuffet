import React from 'react';
import {connect} from 'react-redux';

import {YellowSpan, RedSpan} from './styled/Spans';
import Container from './styled/Container';
import Section from './styled/Section';
import {Link} from 'react-router-dom';
import Stanza from '../utils/Stanza';
import {RHYME_SCHEMES} from '../utils/phonstants';

const Rhymes = props => {
  let {poetry, rs} = props;

  return (
    <div>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Schemes</RedSpan></h3>
          {poetry.map(line => <p>{line}</p>)}<br/>
          <p>Rhyme Scheme for this stanza: {rs}</p>
          <Link to="/rhyme/scheme"><RedSpan>Read more »</RedSpan></Link>
        </Section>
        <Section>
          <h3><YellowSpan>Rhymes by Type</YellowSpan></h3>
          <p>The most common rhyme-types in this sample are:</p>
          <ol>
            <li>Full rhyme</li>
            <li>Promotion rhyme</li>
          </ol>
          <Link href="#"><YellowSpan>Read more »</YellowSpan></Link>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state,
  poetry: new Stanza(state.poetry).getLines(),
  rs: RHYME_SCHEMES[state.rs],
})


export default connect(mapStateToProps)(Rhymes)
