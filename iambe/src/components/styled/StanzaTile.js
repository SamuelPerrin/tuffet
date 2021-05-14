import styled from 'styled-components';

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
    border: 1px solid ${props => props.theme.black};
    border-radius: 15%;
    cursor:pointer;
  }
`

export default function StanzaTile(props) {
  const { children, maxWidth, className } = props;

  return (
    <StanzaTileWrapper maxWidth={maxWidth} className={className}>
      {children.map(child => <p>{child}</p>)}
    </StanzaTileWrapper>
  )
};