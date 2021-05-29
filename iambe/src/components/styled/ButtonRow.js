import React from 'react';
import styled from 'styled-components';

const ButtonRowWrapper = styled.div`
  width: 100%;
  display:flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export default function ButtonRow (props) {
  const {maxWidth, children} = props;
  return (
    <ButtonRowWrapper maxWidth={maxWidth}>
      {children}
    </ButtonRowWrapper>
  )
}