import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { closeAboutSubMenu, toggleMenu } from '../../actions';
import NavMenu from './NavMenu';

const StyledHamburger = styled.button`
  background-color: rgba(0,0,0,0);
  border:none;
  width: 1.5rem;
  /* min-height: 1.5rem; */
  /* padding:0.25rem; */
  margin: 0.75rem;
  cursor:pointer;

  &.closed {
    > span {
      display:block;
      width:1.5rem;
      height:2px;
      background-color:${props => props.theme.white};
      transition: all 300ms ease-in-out;
      transform-origin: 1px 1px;

      &:not(:last-child) {
        margin-bottom:0.3rem;
      }
    }
  }

  &.open {
    > span {
      display:block;
      width:1.5rem;
      height:2px;
      background-color:${props => props.theme.white};
      transition: all 300ms ease-in-out;
      transform-origin: 1px 1px;
    }

      &:not(:last-child) {
        margin-bottom:0.3rem;
      }
    > span:first-child {
      transform: rotate(45deg);
    }
      
    > span:nth-child(2) {
      opacity: 0;
      height:0.8rem;
    }
    
    > span:last-child {
      transform: rotate(-45deg);
    }
  }
`

const Hamburger = props => {
  const { isMenuOpen, toggleMenu, closeAboutSubMenu } = props;

  const switchMenu = e => {
    e && e.preventDefault();
    toggleMenu();
    if (!isMenuOpen) closeAboutSubMenu();
  }
  
  return (
    <>
      <StyledHamburger onClick={switchMenu} className={isMenuOpen ? 'open' : 'closed'}>
        <span></span>
        <span></span>
        <span></span>
      </StyledHamburger>
      <NavMenu />
    </>
  )
}

const mapStateToProps = state => {
  return {
    poetry: state.poetry,
    isMenuOpen: state.isMenuOpen,
  }
}

export default connect(mapStateToProps, { toggleMenu, closeAboutSubMenu })(Hamburger)
