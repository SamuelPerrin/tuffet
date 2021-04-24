import React from 'react';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';

const Scansion = () => {
  return (
    <div>
      <Container>
        <Section>
          <h3><YellowSpan>Scansion</YellowSpan></h3>
          <p>This stanza's meter is a variant of: <RedSpan>common hymn</RedSpan>.</p>
        </Section>
      </Container>
    </div>
  )
}

export default Scansion
