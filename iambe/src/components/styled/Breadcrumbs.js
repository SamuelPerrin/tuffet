import React from 'react';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.nav`
  display: flex;
  flex-flow: row wrap;
  justify-content:flex-start;
  margin: ${props => props.theme.space};

  .current {
    font-weight: bold;
    text-decoration: none;
  }
`

export default function Breadcrumbs(props) {
  const {maxWidth, children, ...rest} = props;
  return(
    <BreadcrumbWrapper {...rest} maxWidth={maxWidth} aria-label='Breadcrumb'>
      {children.map((child, i) =>
      <>
        <span key={child}>{child}</span>
        {i === children.length - 1 ? null : <>&nbsp;/&nbsp;</>}
      </>)}
    </BreadcrumbWrapper>
  )
}