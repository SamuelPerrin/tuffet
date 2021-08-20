import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const TextAreaWrapper = styled.div`
  display:flex;
  flex-flow:column nowrap;
  justify-content:center;
  position:relative;

  @media (max-width:650px) {
    width: 95%;
  }

  @media (min-width:650px) {
    width: ${props => {
      switch(props.variant) {
        case 'no-clear':
          return '20rem'
        default:
          return '40rem';
      }
    }};
  }
  
  button {
    position:absolute;
    top:3px;
    right:1.1rem;
    width:3rem;
    height:2rem;
    padding:0;
  }

  .error {
    color: ${props => props.theme.red};
    font-size: ${props => props.theme.smallFont};
    text-align:center;
  }
`

const StyledTextArea = styled.textarea`
  width: calc(100% - 2rem);
  max-width: ${props => props.theme.textAreaWidth};
  margin: ${props => props.theme.space};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  font-size: ${props => props.theme.inputFontSize};
  height: ${props => props.theme.textAreaHeight};
  padding: ${props => props.theme.textAreaPadding};
  border: ${props => {
    switch(props.variant) {
      case 'no-clear':
        return '1px solid ' + props.theme.black;
      default:
        return '2px solid ' + props.theme.black;
    }
  }};
  border: 2px solid ${props => props.theme.black};
`

export default function TextArea(props) {
  const {onChange, value, setValue, name, placeholder, variant, error, ...rest} = props;

  const clearText = e => {
    e.preventDefault();
    setValue("");
  }

  return(
    <TextAreaWrapper variant={variant}>
      <StyledTextArea
        {...rest}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows='15'
      />
      {variant !== 'no-clear' && value &&
        <Button
        onClick={clearText}
        variant='clear'
        >
          Clear
        </Button>
      }
      <p className="error">{error}</p>
    </TextAreaWrapper>
  )
}