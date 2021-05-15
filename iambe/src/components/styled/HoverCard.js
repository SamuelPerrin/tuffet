import styled from 'styled-components';

const HoverCardWrapper = styled.div`
  position: relative;
  display: inline-block;

  .tooltiptext {
    visibility: hidden;
    max-width: 100%;
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    /* text-align: center; */
    border-radius: 6px;
    padding: 8px 6px;
    font-size: ${props => props.theme.smallFont};
    box-shadow: 2px 2px 5px ${props => props.theme.gray};

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 107%;
  }

  &:hover .tooltiptext {
    visibility:visible;
  }
`

export default function HoverCard(props) {
  const {children, maxWidth, hoverText} = props;

  return (
    <HoverCardWrapper maxWidth={maxWidth}>
        {children}
      {hoverText && <div className={'tooltiptext'}>
        {hoverText}
      </div>}
    </HoverCardWrapper>
  )
}