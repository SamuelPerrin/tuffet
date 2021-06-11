import styled from 'styled-components';

const Section = styled.section`
  display:flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-bottom: ${props => props.theme.space};
  color: ${props => props.theme.black};
  h3 {
    font-size: ${props => props.theme.headerFontSize};
    text-align: left;
  }
  p {
    font-size: ${props => props.theme.fontSize};
  }
  li {
    font-size: ${props => props.theme.fontSize};
  }
  .paragraph p {
    max-width: 30rem;
    margin: 1rem 0.3rem;
    text-align:justify;
  }
`

export default Section