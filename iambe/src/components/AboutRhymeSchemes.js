import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { RedSpan, YellowSpan } from './styled/Spans';
import Accordion from './styled/Accordion';

import { RHYME_SCHEME_DESCRIPTIONS } from '../utils/descriptions';

const AboutRhymeSchemes = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme'>Rhyme</Link>
        <Link to='/about/rhyme-schemes' className='current'>About Rhyme Schemes</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><YellowSpan>About: Rhyme Schemes</YellowSpan></h2>
          <div className='paragraph'>
            <p>Tuffet identifies rhyme schemes using an algorithm that compares the pronunciation of the last word of each line in the stanza. It looks for the best match from among the dozens of rhyme schemes it recognizes.</p>
            <p></p>
          </div>
        </Section>
        <Section>
          <h2><RedSpan>Tuffet's Rhyme Schemes</RedSpan></h2>
          <p>Below is a list of all the rhyme schemes that Tuffet looks for:</p>
          <Accordion 
            data={
              Object
                .entries(RHYME_SCHEME_DESCRIPTIONS)
                .map(x => [
                  x[0].slice(0,1).toUpperCase() + x[0].slice(1),
                  x[1]
                ])
            }
          />
        </Section>
      </Container>
    </div>
  )
}

export default AboutRhymeSchemes
