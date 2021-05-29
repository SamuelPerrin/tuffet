import styled from 'styled-components';
import HoverCard from './HoverCard';

const StanzaTileWrapper = styled.div`
  display:flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  padding:1rem;
  border: none;

  &:hover {
    border-radius: 5%;
    cursor:pointer;
    background:${props => props.theme.pale};
  }
`

export default function StanzaTile(props) {
  const { children, maxWidth, className, hoverText, onClick, stanzaNum } = props;

  return (
    <StanzaTileWrapper maxWidth={maxWidth} className={className}>
      <HoverCard hoverText={hoverText} onClick={onClick}>
        {children.map(child => <p stanzanum={stanzaNum} onClick={onClick} key={child}>{child}</p>)}
      </HoverCard>
    </StanzaTileWrapper>
  )
};