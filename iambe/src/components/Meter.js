import React from 'react';
import {Link} from 'react-router-dom';

const Meter = () => {
  return (
    <div>
      <section>
        <h3 className="blue">Stanzas by Meter</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link to="/meter/scansion">Read more »</Link>
      </section>
      <section>
        <h3 className="red">Stanzas by Verse Form</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link to="#">Read more »</Link>
      </section>
    </div>
  )
}

export default Meter
