import React from 'react';
import styled from 'styled-components';
import {WHITE} from '../../constants/colors';

const ButtonWrapper = styled.button`
  color:${WHITE};
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: ${props => {
    switch(props) {
      default:
        return props.theme.borderRadius
    }
  }};
  background-color: ${props => {
    switch(props.variant) {
      case 'danger':
        return props.theme.dangerColor
      case 'disabled':
        return props.theme.disabledColor
      default:
        return props.theme.blue
    }
  }};
  font-size: ${props => {
    switch(props.variant) {
      default:
        return props.theme.fontSize
    }
  }};
  width: ${props => {
    switch(props) {
      default:
        return props.theme.buttonWidth
    }
  }};
  height: ${props => {
    switch(props) {
      default:
        return props.theme.buttonHeight
    }
  }};
  margin: ${props => {
    switch(props) {
      default:
        return props.theme.space
    }
  }};
  &:hover{
    color:${props => props.theme.pale};
    background-color: ${props => {
      switch(props.variant) {
        case 'danger':
          return '#EE4F45'
        case 'disabled':
          return '#85858B'
        default:
          return '#2877C6'
      }
    }};
    transition: all 0.1s ease-in-out;
  }
  transition: all 0.1s ease-in-out;
`



export default function Button(props) {
  const {onClick, children, variant, size, ...rest} = props;
  return(
    <ButtonWrapper {...rest} size={size} onClick={onClick} variant={variant} disabled={variant==='disabled'}>
        {children}
    </ButtonWrapper>
  )
}