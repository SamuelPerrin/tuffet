import React from 'react';
import {YellowSpan, RedSpan} from './Spans';
import {Link} from 'react-router-dom';

const Scansion = () => {
  return (
    <div>
      <section>
        <h3><YellowSpan>Scansion</YellowSpan></h3>
        <p>This stanza's meter is a variant of: <RedSpan>common hymn</RedSpan>.</p>
      </section>
    </div>
  )
}

export default Scansion
