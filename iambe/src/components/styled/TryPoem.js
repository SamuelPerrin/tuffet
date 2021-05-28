import React from 'react';
import styled from 'styled-components';
import * as theme from '../../constants/colors';

const colors = {'1': theme.BLUE, '2': theme.YELLOW, '3': theme.RED};

const TryWrapper = styled.div`
  border: 1px solid ${props => props.theme.black};
  border-radius: ${props => props.theme.borderRadius};
  width: 10rem;
  height: 5rem;
  padding: ${props => props.theme.space};
  margin: ${props => props.theme.space};
  color: ${props => props.theme.white};
  background-color: ${props => colors[props.bgc]};
  opacity:100%;
  display:flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity:85%;
    cursor:pointer;
    /* color: ${props => props.theme.black}; */
  }
`

export default function TryPoem (props) {
  const {maxWidth, children, onClick, bgc} = props;
  return (
    <TryWrapper maxWidth={maxWidth} onClick={onClick} bgc={bgc}>
      {children}
    </TryWrapper>
  )
}