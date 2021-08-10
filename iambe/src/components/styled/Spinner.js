import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spin = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border-top: 4px solid ${props => props.theme.blue};
  border-right: 4px solid transparent;
  animation: ${rotate} 1s linear infinite;
  margin-top: 2rem;
`

const Spinner = props => {
  return (
    <Spin className="spinner" props />
  )
}

export default Spinner
