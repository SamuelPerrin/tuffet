import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import { RedSpan } from './styled/Spans';
import Accordion from './styled/Accordion';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';

import { all_samples } from '../constants/samples';
import { getRhymes, getMeter } from '../actions';

const Samples = props => {
  const { getRhymes, getMeter } = props;
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const submitRhymes = (poem) => {
    getRhymes(poem);
    history.push('/rhyme');
  }

  const submitMeter = (poem) => {
    getMeter(poem);
    history.push('/meter');
  }

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/samples' className='current'>Samples</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><RedSpan>Samples</RedSpan></h2>
          <p>Explore great poetry with Tuffet!</p>
          <Accordion
            data={
              Object
                .entries(all_samples)
                .map(x => [
                  x[0] + ": " + x[1].title,
                  (<div key={x[0]}>
                    {x[1].sample}
                    <ButtonRow>
                      <Button
                        onClick={() => submitRhymes(x[1].toRun)}
                      >
                        Get Rhymes
                      </Button>
                      <Button
                        onClick={() => submitMeter(x[1].toRun)}
                      >
                        Get Meter
                      </Button>
                    </ButtonRow>
                  </div>)
                ])
            }
          />
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    poetry: state.poetry,
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter })(Samples);
