import React from 'react';
import styled from 'styled-components';

const ScannedLineWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  line-height: 1;
  font-family: monospace;
  text-align: left;

  p {
    font-size: ${props => props.theme.smallFont};
  }
 `

const ScannedLine = props => {
  const {marks, line} = props;

  return (
    <ScannedLineWrapper>
      <pre style={{fontSize:'0.75rem'}}>{marks}</pre>
      <p className='scannedLine'>{line}</p>
    </ScannedLineWrapper>
  )
}

export default ScannedLine;