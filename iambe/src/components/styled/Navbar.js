import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
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

  .username {
    font-size:1rem;
    text-decoration:none;
  }

  .unread {
    font-weight:bold;
    color:${props => props.theme.white};
    font-size:${props => props.smallFont};
  }
`;

const Navbar = props => {
  const { isMenuOpen, currentUser, toggleMenu, closeAboutSubMenu, messages } = props;
  const history = useHistory();
  let unreadMessages = messages.filter(x => !x.read).length;

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
      <div style={{display:'flex', alignItems:"center"}}>
        <Link
          to='/my-poems'
          className="username"
        >
          {currentUser && currentUser.username}
          {currentUser.role === "ADMIN" && <sup className="unread">{unreadMessages > 0 && unreadMessages}</sup>}
        </Link>
        <Hamburger />
      </div>
    </NavWrapper>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
    isMenuOpen: state.isMenuOpen,
    currentUser: state.currentUser,
    messages: state.messages,
  }
}

export default connect(mapStateToProps, { toggleMenu, closeAboutSubMenu })(Navbar);