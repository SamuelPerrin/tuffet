import styled from 'styled-components';
import HoverCard from './HoverCard';

const StanzaTileWrapper = styled.div`
  display:flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  /* width: 100%; */
  padding:1rem;
  border: none;
  
  p {
    font-size: 1rem;
  }
  &:hover {
    /* border: 1px solid ${props => props.theme.blue}; */
    border-radius: 5%;
    cursor:pointer;
    /* padding:calc(1rem - 1px); */
    background:${props => props.theme.pale};
  }
`

export default function StanzaTile(props) {
  const { children, maxWidth, className, hoverText } = props;

  return (
    <StanzaTileWrapper maxWidth={maxWidth} className={className}>
      <HoverCard hoverText={hoverText}>
        {children.map(child => <p>{child}</p>)}
      </HoverCard>
    </StanzaTileWrapper>
  )
};