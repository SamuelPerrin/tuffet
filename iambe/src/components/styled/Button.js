import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  color: ${props => {
    switch(props.variant) {
      case 'clear':
        return props.theme.gray;
      default:
        return props.theme.white;
    }
  }};
  cursor: pointer;
  outline: none;
  border: ${props => {
    switch(props.variant) {
      case 'clear':
        return '1px solid ' + props.theme.gray;
      default:
        return 'none';
    }
  }};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => {
    switch(props.variant) {
      case 'danger':
        return props.theme.dangerColor;
      case 'disabled':
        return props.theme.disabledColor;
      case 'clear':
        return 'rgba(255,255,255,0.5)';
      default:
        return props.theme.blue;
    }
  }};

  font-size: ${props => props.theme.fontSize};
  width: ${props => {
    switch(props.size) {
      case 'small':
        return 'auto';
      default:
        return props.theme.buttonWidth;
    }
  }};
  padding: ${props => {
    switch(props.size) {
      case 'small':
        return '0.5rem 2rem';
      default:
        return 'auto';
    }
  }};
  max-width: 18rem;
  height: ${props => props.theme.buttonHeight};
  margin: ${props => props.theme.space};

  &:hover{
    color:${props => {
      switch (props.variant) {
        case 'clear':
          return props.theme.white;
        default:
          return props.theme.pale;
      }}
    };
    background-color: ${props => {
      switch(props.variant) {
        case 'danger':
          return '#EE4F45';
        case 'disabled':
          return '#85858B';
        case 'clear':
          return props.theme.gray;
        default:
          return '#2877C6';
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