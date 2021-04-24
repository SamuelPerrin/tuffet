import React, {useState} from 'react';
import Section from './styled/Section';
import {YellowSpan, RedSpan, BlueSpan} from './styled/Spans';
import Button from './styled/Button';

const initialValue = ""

const Home = () => {
  const [poem, setPoem] = useState(initialValue)

  const handleChange = e => {
    setPoem(e.target.value);
  }

  const submitRhymes = e => {
    e.preventDefault();
  }

  const submitMeter = e => {
    e.preventDefault()
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
          <textarea value={poem} onChange={handleChange} placeholder="Enter a poem..." />
          <Button onClick={submitRhymes}>Get Rhymes</Button>
          <Button onClick={submitMeter}>Get Meter</Button>
        </form>  
      </Section>
    </div>
  )
}

export default Home
