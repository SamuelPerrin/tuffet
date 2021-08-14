import React from 'react';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.nav`
  display: flex;
  flex-flow: row wrap;
  justify-content:flex-start;
  margin: ${props => props.theme.space};
  margin-top: 0.5rem;
  color: ${props => props.theme.purple};

  .current {
    font-weight: bold;
    text-decoration: none;
  }
`

export default function Breadcrumbs(props) {
  const {maxWidth, children, ...rest} = props;
  return(
    <BreadcrumbWrapper {...rest} maxWidth={maxWidth} aria-label='Breadcrumb'>
      {
        children.map((child, i) => {
          if (child) return <span key={i}>{child}&nbsp;/&nbsp;</span>
          else return null;
        })
      }
    </BreadcrumbWrapper>
  )
}