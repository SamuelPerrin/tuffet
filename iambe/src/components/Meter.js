import React from 'react';
import Container from './styled/Container';
import Section from './styled/Section';
import {BlueSpan, RedSpan} from './styled/Spans';
import {Link} from 'react-router-dom';

const Meter = () => {
  return (
    <div>
      <Container>
        <Section>
          <h3><BlueSpan>Stanzas by Meter</BlueSpan></h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Link to="/meter/scansion"><BlueSpan>Read more »</BlueSpan></Link>
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

export default Meter
