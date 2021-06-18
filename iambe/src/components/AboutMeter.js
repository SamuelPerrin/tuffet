import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { RedSpan, YellowSpan } from './styled/Spans';
import Accordion from './styled/Accordion';

import { STANZA_METER_DESCRIPTIONS } from '../utils/descriptions';

const AboutMeter = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/about/meter' className='current'>About</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>About: Meter</RedSpan></h2>
          <div className='paragraph'>
            <p>Tuffet identifies the meter of a line of poetry using an algorithm that pronounces each of the line's words and determines each syllable's stress relative to those around it. It compiles the data for several such lines to identify metrical patterns at the level of the stanza.</p>
            <p>The dictionary that Tuffet uses to identify pronunciations isn't perfect, and the algorithm has biases embedded in it about what sort of metrical patterns it should look for. As a result, you will probably disagree with some of Tuffet's scansion at the level of syllables and even whole lines. At the level of stanza, it is more cautious and perhaps more often correct.</p>
          </div>
        </Section>
        <Section>
          <h2><YellowSpan>Tuffet's Stanzaic Meters</YellowSpan></h2>
          <p>Below is a list of all the types of stanzaic meter that Tuffet can identify, with a description of each.</p>
          <Accordion data={Object.entries(STANZA_METER_DESCRIPTIONS).map(x => [x[0].slice(0,1).toUpperCase() + x[0].slice(1),x[1]])} />
        </Section>
      </Container>
    </div>
  )
}

export default AboutMeter
