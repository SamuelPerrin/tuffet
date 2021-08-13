import React from 'react';

import LineTile from './LineTile';
import PoemBox from './PoemBox';

const ScannedStanza = props => {
  const {stanza, submitLineNum} = props;
  const lines = stanza.getLines();

  return (
    <PoemBox>
      {lines.map((line, i) => <LineTile key={line} rt={i} onClick={submitLineNum}>{line}</LineTile>)}
    </PoemBox>
  )
}

export default ScannedStanza;