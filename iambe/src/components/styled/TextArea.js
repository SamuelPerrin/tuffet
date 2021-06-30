import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const TextAreaWrapper = styled.div`
  position:relative;

  @media (max-width:650px) {
    width:80%;
  }

  @media (min-width:650px) {
    width:40rem;
  }
  
  button {
    position:absolute;
    top:3px;
    right:1.1rem;
    width:3rem;
    height:2rem;
    padding:0;
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
  border: 2px solid ${props => props.theme.black};
`

export default function TextArea(props) {
  const {onChange, value, setValue, name, placeholder, ...rest} = props;

  const clearText = e => {
    e.preventDefault();
    setValue("");
  }

  return(
    <TextAreaWrapper>
      <StyledTextArea
        {...rest}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows='15'
      />
      <Button
        onClick={clearText}
        variant='clear'
      >
        Clear
      </Button>
    </TextAreaWrapper>
  )
}