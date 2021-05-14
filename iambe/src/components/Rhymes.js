import React from 'react';
import {connect} from 'react-redux';

import {YellowSpan, RedSpan} from './styled/Spans';
import Container from './styled/Container';
import Section from './styled/Section';
import StanzaTile from './styled/StanzaTile';
import {Link} from 'react-router-dom';
import Stanza from '../utils/Stanza';
import {RHYME_SCHEMES, RHYME_TYPES} from '../utils/phonstants';

const Rhymes = props => {
  let {poetry, rs, rhymes} = props;

  return (
    <div>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Schemes</RedSpan></h3>
          {/* {poetry.map(line => <p>{line}</p>)}<br/> */}
          <StanzaTile children={poetry} />
          <p>Rhyme Scheme for this stanza: {rs}</p>
          <Link to="/rhyme/scheme"><RedSpan>Read more »</RedSpan></Link>
        </Section>
        <Section>
          <h3><YellowSpan>Rhymes by Type</YellowSpan></h3>
          <p>The most common rhyme-types in this sample are:</p>
          <ol>
            {rhymes && rhymes.rt && <li>{RHYME_TYPES[rhymes.rt]}: ({rhymes.words[0]} - {rhymes.words[1]})</li>}
          </ol>
          <Link href="#"><YellowSpan>Read more »</YellowSpan></Link>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(`in mapStateToProps with ${state.rhymes.rt}`)
  return {
  ...state,
  poetry: new Stanza(state.poetry).getLines(),
  rs: RHYME_SCHEMES[state.rs],
  rhymes: state.rhymes,
  }
}


export default connect(mapStateToProps)(Rhymes)
