import React from 'react';
import styled from 'styled-components';

const TextAreaWrapper = styled.textarea`
  width: ${props => props.theme.textAreaWidth};
  margin-bottom: ${props => props.theme.space};
  textarea {
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
    font-size: ${props => props.theme.inputFontSize};
    width: '100%';
    height: ${props => props.theme.textAreaHeight};
    padding: ${props => props.theme.textAreaPadding};
    border: '12px solid ${props => props.theme.black}';
  }
`

export default function TextArea(props) {
  const {onChange, value, name, placeholder, ...rest} = props;
  return(
    <TextAreaWrapper {...rest} name={name} value={value} onChange={onChange} placeholder={placeholder} rows='15' />
      // <textarea name={name} value={value} onChange={onChange} placeholder={placeholder}/>
    // </TextAreaWrapper>
  )
}