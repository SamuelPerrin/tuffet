import React from 'react';

import LineTile from './LineTile';

const ScannedStanza = props => {
  const {stanza, submitLineNum} = props;
  const lines = stanza.getLines();

  return (
    <div style={{border:'1px solid black',borderRadius:'5px',padding:'1rem',marginTop:'1rem'}}>
      {lines.map((line, i) => <LineTile key={line} rt={i} onClick={submitLineNum}>{line}</LineTile>)}
    </div>
  )
}

export default ScannedStanza;