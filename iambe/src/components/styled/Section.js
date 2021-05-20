import styled from 'styled-components';

const Section = styled.section`
  display:flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  h3 {
    font-size: 1.5rem;
    text-align: left;
  }
  p {
    font-size: 1rem;
  }
  li {
    font-size: 1rem;
  }
  a {
    font-size: .85rem;
  }
  .paragraph p {
    max-width: 30rem;
    margin: 1rem 0.3rem;
    text-align:justify;
  }
`

export default Section