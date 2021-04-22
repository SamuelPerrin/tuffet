import React from 'react';
import {Link} from 'react-router-dom';

const Rhymes = () => {
  return (
    <div>
      <section>
        <h3 className="red">Rhyme Schemes</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link to="#" className="red">Read more »</Link>
      </section>
      <section>
        <h3 className="yellow">Rhymes by Type</h3>
        <p>The most common rhyme-types in this sample are:</p>
        <ol>
          <li>Full rhyme</li>
          <li>Promotion rhyme</li>
        </ol>
        <Link href="#" className="yellow">Read more »</Link>
      </section>
    </div>
  )
}

export default Rhymes
