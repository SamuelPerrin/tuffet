import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: ${(props) => props.maxWidth};
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-size: 1.5rem;
    }
`

export default function Container(props) {
    const { children, maxWidth, className } = props

    return (
        <ContainerWrapper maxWidth={maxWidth} className={className}>
            {children}
        </ContainerWrapper>
    )
} 