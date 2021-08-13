import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import ButtonRow from './ButtonRow';

const ModalWrapper = styled.div`
  height:13rem;
  width:18rem;
  border-radius: 3%;
  padding: ${props => props.theme.space};
  margin: 0.25rem;

  border: ${props => {
    switch(props.variant) {
      case 'delete':
        return '2px solid ' + props.theme.dangerColor;
      default:
        return '2px solid ' + props.theme.blue;
    }
  }};
  
  color: ${props => {
    switch(props.variant) {
      case 'delete':
        return props.theme.dangerColor;
      default:
        return props.theme.blue;
    }
  }};

  p {
    font-weight: bold;
    text-align: center;
  }

  div.icon {
    font-size:1.5rem;
    width:2rem;
    height:2rem;
    border-radius:50%;
    border: ${props => {
      switch(props.variant) {
        case 'delete':
          return '2px solid' + props.theme.dangerColor;
        default:
          return '2px solid ' + props.theme.blue;
      }
    }};
    margin: 0.5rem;
    padding: 0.25rem;
    text-align: center;
    line-height: 1.25rem;
  }
`;

const Modal = props => {
  const { variant, onConfirm, children, rest, setShowModal } = props;
  return (
    <ModalWrapper {...rest} variant={variant}>
      <div style={{display:"flex", flexFlow:"row wrap", justifyContent:"center", alignItems:"center"}}>
        <div className='icon'>{variant === 'delete' ? 'x' : '!'}</div>
        <h3>{variant === 'delete' ? 'Delete' : 'Are you sure?'}</h3>
      </div>
      <p>{children}</p>
      <ButtonRow>
        <Button
          variant='inverted'
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button 
          variant='danger'
          onClick={onConfirm}
        >
          {variant ? {'delete':'Delete'}[variant] : 'OK'}
        </Button>
      </ButtonRow>
    </ModalWrapper>
  )
}

export default Modal
