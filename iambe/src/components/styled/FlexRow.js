import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  @media (min-width:950px) {
    display:flex;
    flex-flow:row nowrap;
    justify-content:center;
    align-items:flex-start;
    width:100%;

    > div#text {
      order:1;
      margin-right:2.5%;
    }
    > div#context {
      order:2;
      margin-left:2.5%;
    }
  }

  @media (max-width:949px) {
    display:flex;
    flex-flow:column nowrap;
    width:100%;
  }
`

const FlexRow = props => {
  const { children } = props;

  return (
    <StyledRow>
      {children}
    </StyledRow>
  )
}

export default FlexRow
