import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.label`
  display:flex;
  flex-flow: ${props => {
    switch (props.variant) {
      case 'horizontal':
        return 'row';
      default:
        return 'column'
    }
  }};
  align-items:center;
  justify-content:space-evenly;
  margin:1rem;

  .error {
    color: ${props => props.theme.red};
    font-size: ${props => props.theme.smallFont};
  }
`

const TextInput = props => {
  const { name, type, onChange, placeholder, error, value, label, variant } = props;

  return (
    <InputWrapper variant={variant}>
      {label}
      <input
        name={name}
        type={type ? type : 'text'}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {error && <p className='error'>{error}</p>}
    </InputWrapper>
  )
}

export default TextInput
