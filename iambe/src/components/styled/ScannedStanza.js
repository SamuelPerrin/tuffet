import React from 'react';

import LineTile from './LineTile';

const ScannedStanza = props => {
  const {stanza, submitLineNum} = props;
  const lines = stanza.getLines();

  return (
    <div>
      {lines.map((line, i) => <LineTile key={line} rt={i} onClick={submitLineNum}>{line}</LineTile>)}
    </div>
  )
}

export default ScannedStanza;