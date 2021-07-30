import React from 'react';
import styled from 'styled-components';

const ToastWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width:100%;  
  position:absolute;

  .container {
    display:flex;
    justify-content:flex-end;
    align-items:center;

    background-color: ${props => {
      switch(props.variant) {
        case 'danger':
          return props.theme.dangerColor;
        case 'success':
          return props.theme.green;
          default:
            return props.theme.blue;
          }
      }};
    color: ${props => props.theme.white};
    max-width: 18rem;
    margin: ${props => props.theme.space};
    padding: 0 1rem 0 0;

    position: relative;
    bottom: 2rem;
    width: 100%;
  }

  div.icon {
    font-size:1.5rem;
    width:2rem;
    height:2rem;
    border-radius:50%;
    border: 1px solid ${props => props.theme.white};
    margin: 0.5rem;
    padding: 0.25rem;
    text-align: center;
    line-height: 1.25rem;

    &:hover {
      background-color: ${props => props.theme.white};
      color: ${props => {
      switch(props.variant) {
        case 'danger':
          return props.theme.dangerColor;
        case 'success':
          return props.theme.green;
        default:
          return props.theme.blue;
        }
      }};
      border: 1px solid ${props => {
      switch(props.variant) {
        case 'danger':
          return props.theme.dangerColor;
        case 'success':
          return props.theme.green;
        default:
          return props.theme.blue;
        }
      }};
    }
  }
`

const Toast = props => {
  const {children, variant, onClick} = props;

  return (
    <ToastWrapper variant={variant} onClick={onClick}>
      <div className='container'>
        {variant === 'warning' && <div className='icon'>x</div>}
        {variant === 'success' && <div className='icon'>!</div>}
        {children}
      </div>
    </ToastWrapper>
  )
}

export default Toast;
