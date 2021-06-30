import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Hamburger from './Hamburger';
import tuffetlogo3 from '../../images/tuffetlogo3.png';
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
    width:8rem;
    cursor:pointer;

    img {
      width:2rem;
      height:1.75rem;
      margin-top:0.25rem;
    }
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

  const handleEscape = e => {
    if (isMenuOpen && e.key === 'Escape') {
      toggleMenu();
    }
  }

  return(
    <NavWrapper onKeyDown={handleEscape}>
      <div style={{display:'flex',justifyContent:'space-around'}} className='logo'>
        <img src={tuffetlogo3} alt='logo' onClick={goHome} />
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