import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionItemWrapper = styled.div`
  h3 {
    margin:0;
  }

  h3 button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.gray};
    border-radius: ${props => props.theme.borderRadius};
    border: none;
    width: 100%;
    color: ${props => props.theme.white};
    cursor:pointer;
  }

  h3 button.active {
    background-color:${props => props.theme.blue};
  }

  h3 button:hover {
    background-color: ${props => props.theme.blue};
  }

  h3 button.inactive span {
    font-weight: normal;
    padding: 0 1rem 0 1rem;
  }

  h3 button.active span {
    font-weight: bold;
    padding: 0 1rem 0 1rem;
  }

  .closed-drawer {
    background-color: ${props => props.theme.pale};
    padding: 0.5rem 1rem 0 1rem;
    opacity: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
  }

  .open-drawer {
    background-color: ${props => props.theme.pale};
    padding: 1rem;
    margin-bottom: ${props => props.theme.space};
    border-radius: ${props => props.theme.borderRadius};
    opacity: 1;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
`;

const AccordionItem = props => {
  const {title, text} = props;
  const [active, setActive] = useState(false);

  const toggle = e => {
    e.preventDefault();
    text && setActive(!active);
  }

  return (
    <AccordionItemWrapper>
      <h3>
        <button
          onClick={toggle}
          className={active ? 'active item' : 'inactive item'}
        >
          <span>{title}</span>
          {text && <span>{active ? '–' : '+'}</span>}
        </button>
      </h3>
      <div className='panel'>
        <div className={active ? 'open-drawer' : 'closed-drawer'}>
          {text}
        </div>
      </div>
    </AccordionItemWrapper>
  )
}

const Accordion = props => {
  const {data, ...rest} = props;

  return (
    <div {...rest}>
      {data.map((x, i) => (<AccordionItem key={i} title={x[0]} text={x[1]} />))}
    </div>
  )
}

export default Accordion;