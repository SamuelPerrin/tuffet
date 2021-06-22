import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { RedSpan, YellowSpan } from './styled/Spans';
import Accordion from './styled/Accordion';

import { RHYME_TYPE_DESCRIPTIONS } from '../utils/descriptions';

const AboutRhymes = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme'>Rhyme</Link>
        <Link to='/about/rhymes' className='current'>About</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>About: Rhymes</RedSpan></h2>
          <div className='paragraph'>
            <p>Tuffet identifies rhymes using an algorithm that automatically identifies the rhyme scheme of each stanza you enter. It can distinguish dozens of kinds of slant rhyme and creates data visualizations of their relative frequency.</p>
            <p>The dictionary that Tuffet uses to identify rhymes isn't perfect, and its algorithm sometimes makes mistakes. In general, it does better with shorter stanzas than with long ones. At this time, it doesn't look for <strong>internal rhyme</strong> like <em>While I nodded, nearly napping, suddenly there came a tapping</em> or for <strong>mosaic rhyme</strong> like <em>Shakespeare&ndash;lake's pier</em>, instead focusing on end rhyme between single words. It also cannot identify rhymes that cross stanza-breaks, so it is not well suited to terza rima.</p>
          </div>
        </Section>
        <Section>
          <h2><YellowSpan>Tuffet's Rhyme Types</YellowSpan></h2>
          <p>Below is a list of all the kinds of rhyme that Tuffet can identify, with a description of each.</p>
          <Accordion data={Object.entries(RHYME_TYPE_DESCRIPTIONS).map(x => [x[0].slice(0,1).toUpperCase() + x[0].slice(1),x[1]])}/>
        </Section>
      </Container>
    </div>
  )
}

export default AboutRhymes;