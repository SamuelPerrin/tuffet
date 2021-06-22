import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan } from './styled/Spans';
import Button from './styled/Button';

const PageNotFound = () => {
  const history = useHistory();

  const goHome = () => history.push('/');

  return (
    <Container>
      <Section>
        <h2><YellowSpan>Oops...</YellowSpan></h2>
        <p>Page not found.</p>
        <Button onClick={goHome}>Go Home</Button>
      </Section>
    </Container>
  )
}

export default PageNotFound
