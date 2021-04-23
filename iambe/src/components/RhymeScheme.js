import React from 'react';
import {BlueSpan, RedSpan} from './Spans';
import {Link} from 'react-router-dom';

const RhymeScheme = () => {
  return (
    <div>
      <section>
        <h3><RedSpan>Rhyme Scheme</RedSpan></h3>
        <p>This stanza's rhyme scheme is: <BlueSpan>Shakespearean sonnet</BlueSpan>.</p>
      </section>
    </div>
  )
}

export default RhymeScheme
