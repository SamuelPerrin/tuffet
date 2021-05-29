import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Section from './styled/Section';
import {YellowSpan, RedSpan, BlueSpan} from './styled/Spans';
import TryPoem from './styled/TryPoem';
import TextArea from './styled/TextArea';
import Button from './styled/Button';
import {getRhymes, getMeter} from '../actions';

import * as samples from '../constants/samples';
import * as theme from '../constants/colors'; 

const initialValue = ""

const Home = props => {
  const [poem, setPoem] = useState(initialValue);
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
      <Section style={{marginTop:'3rem'}}>
        <h3>Poetry is easier than ever with Iambe!</h3>
        <ul>
          <li>Visualize <RedSpan>rhyme schemes</RedSpan>!</li>
          <li>Detect over a dozen kinds of <YellowSpan>slant rhyme</YellowSpan>!</li>
          <li>Identify <BlueSpan>meter</BlueSpan> and <BlueSpan>verse form</BlueSpan>!</li>
        </ul>
      </Section>
      <Section>
        <h3>Try it!</h3>
        <div style={{display:'flex', flexFlow:'row wrap', justifyContent:'center', alignItems:'center', width:'100%'}}>
          <Button onClick={() => submitSample(samples.STITCH)}>A stitch in time</Button>
          <Button onClick={() => submitSample(samples.GRACE)}>Amazing grace</Button>
          <Button onClick={() => submitSample(samples.MARY)}>Mary had a little lamb</Button>
        </div>
        <form style={{width:'100%', display:'flex', flexFlow:'column nowrap', alignItems:'center', justifyContent:'center'}}>
          <TextArea value={poem} onChange={handleChange} placeholder="Enter a poem..." />
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap', width:'100%'}}>
            <Button onClick={submitRhymes}>Get Rhymes</Button>
            <Button onClick={submitMeter}>Get Meter</Button>
          </div>
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
