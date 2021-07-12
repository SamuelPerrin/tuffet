import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { RedSpan, YellowSpan, BlueSpan } from './styled/Spans';
import Accordion from './styled/Accordion';

import { FAQs } from '../utils/descriptions';

const Video = styled.iframe`
  /* for mobile */
  @media (max-width:800px) {
    width:90%;
    height:calc(9*90vw/16);
  }

  /* for larger screens */
  @media (min-width:800px) {
    width:560px;
    height:315px;
  }

  margin-bottom:${props => props.theme.space};
`

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/about' className='current'>About</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><YellowSpan>About Tuffet</YellowSpan></h2>
          <div className='paragraph'>
            <p>Tuffet is a poetry resource that automatically identifies the rhymes and meter of poetry in English. It uses a dictionary adapted from the open-source Carnegie Mellon Pronouncing Dictionary.</p>
          </div>
        </Section>
        <Video
          width="560"
          height="315"
          src="https://www.youtube.com/embed/N8XZ_QScfQw"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Section>
          <h2><RedSpan>Frequently Asked Questions</RedSpan></h2>
          <Accordion data={Object.entries(FAQs)} />
        </Section>
        <Section className='paragraph'>
          <h2><BlueSpan>Learn more</BlueSpan></h2>
          <p>See what Tuffet has to say about:</p>
          <ul style={{marginTop:'0'}}>
            <li><Link to='/about/rhyme-schemes'><RedSpan>Rhyme Schemes</RedSpan></Link></li>
            <li><Link to='/about/rhymes'><YellowSpan>Rhymes</YellowSpan></Link></li>
            <li><Link to='/about/meter'><BlueSpan>Meter</BlueSpan></Link></li>
          </ul>
        </Section>
      </Container>
    </div>
  );
}

export default FAQ
