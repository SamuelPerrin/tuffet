import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Section from './styled/Section';
import { YellowSpan, RedSpan, BlueSpan } from './styled/Spans';
import ButtonRow from './styled/ButtonRow';
import TextArea from './styled/TextArea';
import Button from './styled/Button';
import { getRhymes, getMeter } from '../actions';

import * as samples from '../constants/samples';


const Home = props => {
  const { poetry } = props;
  const [poem, setPoem] = useState(poetry ? poetry: "");
  let history = useHistory();

  const handleChange = e => {
    setPoem(e.target.value);
  }

  const submitRhymes = e => {
    e.preventDefault();
    props.getRhymes(poem);
    history.push('/rhyme');
  }

  const submitMeter = e => {
    e.preventDefault();
    props.getMeter(poem);
    history.push('/meter');
  }

  const submitSample = sample => {
    props.getRhymes(sample);
    history.push('/rhyme');
  };

  return (
    <div>
      <Section style={{marginTop:'1rem'}}>
        <h3>Poetry is easier than ever with Tuffet!</h3>
        <ul>
          <li>Visualize <RedSpan><Link to='/about/rhymes'>rhyme schemes</Link></RedSpan>!</li>
          <li>Detect over a dozen kinds of <YellowSpan><Link to='/about/rhymes'>slant rhyme</Link></YellowSpan>!</li>
          <li>Identify <BlueSpan><Link to='/about/meter'>meter</Link></BlueSpan> and <BlueSpan><Link to='/about/meter'>verse form</Link></BlueSpan>!</li>
        </ul>
      </Section>
      <Section>
        <h3>Try it with one of these samples!</h3>
        <ButtonRow>
          <Button onClick={() => submitSample(samples.STITCH)}>Stitch in Time</Button>
          <Button onClick={() => submitSample(samples.GRACE)}>Amazing Grace</Button>
          <Button onClick={() => submitSample(samples.SONNET116)}>Sonnet 116</Button>
        </ButtonRow>
        <form style={{width:'100%', display:'flex', flexFlow:'column nowrap', alignItems:'center', justifyContent:'center'}}>
          <h3>Or enter some poetry of your own:</h3>
          <TextArea value={poem} onChange={handleChange} placeholder="Enter a poem..." />
          <ButtonRow>
            <Button onClick={submitRhymes}>Get Rhymes</Button>
            <Button onClick={submitMeter}>Get Meter</Button>
          </ButtonRow>
        </form>  
      </Section>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    poetry: state.poetry
  };
};

export default connect(mapStateToProps, { getRhymes, getMeter })(Home)
