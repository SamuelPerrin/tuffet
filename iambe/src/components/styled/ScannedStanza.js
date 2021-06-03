import React from 'react';
import styled from 'styled-components';

import LineTile from './LineTile';

import Stanza from '../../utils/Stanza';

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