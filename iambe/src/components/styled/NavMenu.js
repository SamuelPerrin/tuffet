import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getRhymes, getMeter, toggleMenu, toggleAboutSubMenu, closeAboutSubMenu, toggleSampleMenu, closeSampleMenu, signOut, setMessages } from '../../actions';
import {POPE, BYRON, KEATS, DICKINSON} from '../../constants/samples';
import { fetchMessages } from '../../api-client/auth';

const StyledMenu = styled.div`
  position: absolute;
  right: 5%;
  top:50%;
  background: ${props => props.theme.pale};
  margin-top: 1.5rem;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.black};
  color: ${props => props.theme.black};
  font-weight:normal;

  &.closed {
    visibility:hidden;
    opacity:0;
  }

  &.open {
    visibility:visible;
    opacity:1;
  }

  span.menu-item {
    display: block;
    font-size: ${props => props.theme.headerFont};
    padding-left:1rem;
    padding-right:1rem;
    cursor:pointer;

    &:hover {
      background-color: ${props => props.theme.darkPale};
    }

    div.open {
      visibility:visible;
      opacity:1;
      height:auto;
    }

    div.closed {
      visibility:hidden;
      opacity:0;
      height:0;
    }

    &.sub-item {
      background: ${props => props.theme.pale};
      font-weight:normal;

      &:hover {
        background: ${props => props.theme.darkPale};
      }
    }

    &.super-item{
      .symbol {
        /* padding-right:${props => props.theme.space}; */
      }
    }
  }
`

const NavMenu = props => {
  const { 
    poetry,
    isMenuOpen,
    isAboutOpen,
    isSampleOpen,
    currentUser,
    getRhymes,
    getMeter,
    toggleMenu,
    toggleAboutSubMenu,
    closeAboutSubMenu,
    toggleSampleMenu,
    closeSampleMenu,
    signOut,
    setMessages,
  } = props;

  const history = useHistory();

  const switchMenu = e => {
    e && e.preventDefault();
    toggleMenu();
    if (!isMenuOpen && isSampleOpen) closeSampleMenu();
    if (!isMenuOpen && isAboutOpen) closeAboutSubMenu();
  }

  const goToURI = (uri) => {
    switchMenu();
    history.push(uri);
  }

  const goToRhymes = (sample) => {
    switchMenu();
    getRhymes(typeof sample === 'string' ? sample : poetry);
    history.push('/rhyme');
  }

  const goToMeter = () => {
    getMeter(poetry);
    switchMenu();
    history.push('/meter');
  }

  const goToDash = async () => {
    switchMenu();
    await setMessages(await fetchMessages());
    history.push('/dashboard');
  }

  const logout = () => {
    window.localStorage.removeItem("tuffet-token");
    window.localStorage.removeItem("userData");
    signOut();
    toggleMenu();
    history.push('');
  }

  return (
    <StyledMenu className={isMenuOpen ? 'open' : 'closed'}>
      <span onClick={() => goToURI('/')} className={'menu-item'}>Home</span>
      <span className='menu-item super-item' onClick={() => toggleAboutSubMenu()}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>About</span>
          <span className='symbol'>
            {isAboutOpen ? '–' : '+'}
          </span>
        </div>
        <div className={isMenuOpen && isAboutOpen ? 'open' : 'closed'}>
          <span onClick={() => goToURI('/about')} className='menu-item sub-item'>About Tuffet</span>
          <span onClick={() => goToURI('/about/rhymes')} className='menu-item sub-item'>About rhyme</span>
          <span onClick={() => goToURI('/about/rhyme-schemes')} className='menu-item sub-item'>About rhyme schemes</span>
          <span onClick={() => goToURI('/about/meter')} className='menu-item sub-item'>About meter</span>
        </div>
      </span>
      <span onClick={() => goToURI('/contact')} className='menu-item'>Contact Us</span>
      <span className='menu-item super-item' onClick={() => toggleSampleMenu()}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Samples</span>
          <span className='symbol'>
            {isSampleOpen ? '–' : '+'}
          </span>
        </div>
        <div className={isMenuOpen && isSampleOpen ? 'open' : 'closed'}>
          <span onClick={() => goToURI('/samples')} className='menu-item sub-item'>All samples</span>
          <span onClick={() => goToRhymes(POPE)} className='menu-item sub-item'>Pope</span>
          <span onClick={() => goToRhymes(BYRON)} className='menu-item sub-item'>Byron</span>
          <span onClick={() => goToRhymes(KEATS)} className='menu-item sub-item'>Keats</span>
          <span onClick={() => goToRhymes(DICKINSON)} className='menu-item sub-item'>Dickinson</span>
        </div>
      </span>
      {poetry && <span onClick={goToRhymes} className='menu-item'>Rhyme</span>}
      {poetry && <span onClick={goToMeter} className='menu-item'>Meter</span>}
      {currentUser ?
        <span onClick={() => goToURI('/my-poems')} className='menu-item'>My Poems</span> : 
        <span onClick={() => goToURI('/login')} className='menu-item'>Login</span>}
      {currentUser && currentUser.role === 'ADMIN' && 
        <span onClick={goToDash} className='menu-item'>Dashboard</span>}
      {currentUser && 
        <span onClick={logout} className='menu-item'>Logout</span>}
    </StyledMenu>
)
}

const mapStateToProps = state => {
  return {
    poetry: state.poetry,
    isMenuOpen: state.isMenuOpen,
    isAboutOpen: state.isAboutOpen,
    isSampleOpen: state.isSampleOpen,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter, toggleMenu, toggleAboutSubMenu, closeAboutSubMenu, toggleSampleMenu, closeSampleMenu, signOut, setMessages })(NavMenu);
