import React from 'react';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  border: ${props => '1px solid ' + props.theme.black};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.space};
  margin-top: ${props => props.theme.space};
`

const PoemBox = props => {
  const { children, ...rest } = props;
  return (
    <BoxWrapper {...rest}>
      {children}
    </BoxWrapper>
  )
}

export default PoemBox
