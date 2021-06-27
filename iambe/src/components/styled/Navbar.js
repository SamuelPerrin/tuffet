import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Hamburger from './Hamburger';
import tuffetlogo1 from '../../images/tuffetlogo1.png';
import { toggleMenu, closeAboutSubMenu } from '../../actions';

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
    /* margin-left: ${props => props.theme.space}; */
    width:8rem;
    cursor:pointer;
  }
`;

const Navbar = props => {
  const { isMenuOpen, toggleMenu, closeAboutSubMenu } = props;
  const history = useHistory();

  const goHome = () => {
    if (isMenuOpen) {
      toggleMenu();
      closeAboutSubMenu();
    }
    history.push('/');
  }

  return(
    <NavWrapper>
      <div style={{display:'flex',justifyContent:'space-around'}} className='logo'>
        <img src={tuffetlogo1} alt='logo' width='32px' onClick={goHome} />
        <span onClick={goHome} >Tuffet</span>
      </div>
      <Hamburger />
    </NavWrapper>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
    isMenuOpen: state.isMenuOpen,
  }
}

export default connect(mapStateToProps, { toggleMenu, closeAboutSubMenu })(Navbar);