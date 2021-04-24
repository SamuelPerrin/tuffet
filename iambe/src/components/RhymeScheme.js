import React from 'react';
import Container from './styled/Container';
import Section from './styled/Section';
import {BlueSpan, RedSpan} from './styled/Spans';

const RhymeScheme = () => {
  return (
    <div>
      <Container>
        <Section>
          <h3><RedSpan>Rhyme Scheme</RedSpan></h3>
          <p>This stanza's rhyme scheme is: <BlueSpan>Shakespearean sonnet</BlueSpan>.</p>
        </Section>
      </Container>
    </div>
  )
}

export default RhymeScheme
