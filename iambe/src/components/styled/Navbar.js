import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Hamburger from './Hamburger';

const NavWrapper = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.blue};
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.headerFontSize};
  width:100%;
  max-height:2.5rem;
  position:relative;
  top:0;
  z-index:10;

  .logo {
    color: ${props => props.theme.white};
    font-size: ${props => props.theme.headerFontSize};
    font-weight: bold;
    text-decoration: none;
    margin-left: ${props => props.theme.space};
  }
`;

export default function Navbar (props) {
  return(
    <NavWrapper>
      <Link to='/' className='logo'>Tuffet</Link>
      <Hamburger />
    </NavWrapper>
  )
}