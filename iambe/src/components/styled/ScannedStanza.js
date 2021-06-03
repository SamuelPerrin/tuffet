import React from 'react';

import LineTile from './LineTile';

const ScannedStanza = props => {
  const {stanza} = props;
  const lines = stanza.getLines();

  return (
    <div>
      {lines.map(line => <LineTile key={line}>{line}</LineTile>)}
    </div>
  )
}

export default ScannedStanza;