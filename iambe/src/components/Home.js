import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Section from './styled/Section';
import {YellowSpan, RedSpan, BlueSpan} from './styled/Spans';
import TextArea from './styled/TextArea';
import Button from './styled/Button';
import {getRhymes, getMeter} from '../actions';

const initialValue = ""

const Home = props => {
  const [poem, setPoem] = useState(initialValue);
  let history = useHistory();

  const handleChange = e => {
    setPoem(e.target.value);
    console.log(`poem's text is now: ${poem}`)
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

  return (
    <div>
      <Section>
        <h3>Poetry is easier than ever with Iambe!</h3>
        <ul>
          <li>Visualize <RedSpan>rhyme schemes</RedSpan>!</li>
          <li>Detect over a dozen kinds of <YellowSpan>slant rhyme</YellowSpan>!</li>
          <li>Identify <BlueSpan>meter</BlueSpan> and <BlueSpan>verse form</BlueSpan>!</li>
        </ul>
      </Section>
      <Section>
        <h3>Try it!</h3>
        <form>
          <TextArea value={poem} onChange={handleChange} placeholder="Enter a poem..." />
          <div>
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
