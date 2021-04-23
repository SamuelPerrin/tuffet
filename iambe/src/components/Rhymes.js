import React from 'react';
import {YellowSpan, RedSpan} from './Spans';
import {Link} from 'react-router-dom';

const Rhymes = () => {
  return (
    <div>
      <section>
        <h3><RedSpan>Rhyme Schemes</RedSpan></h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link to="/rhyme/scheme"><RedSpan>Read more »</RedSpan></Link>
      </section>
      <section>
        <h3><YellowSpan>Rhymes by Type</YellowSpan></h3>
        <p>The most common rhyme-types in this sample are:</p>
        <ol>
          <li>Full rhyme</li>
          <li>Promotion rhyme</li>
        </ol>
        <Link href="#"><YellowSpan>Read more »</YellowSpan></Link>
      </section>
    </div>
  )
}

export default Rhymes
