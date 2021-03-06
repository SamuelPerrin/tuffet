import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { closeAboutSubMenu, toggleMenu, closeSampleMenu } from '../../actions';
import NavMenu from './NavMenu';

const StyledHamburger = styled.button`
  background-color: rgba(0,0,0,0);
  color:white;
  width:6.25rem;
  font-size:1.25rem;
  border:none;
  margin: 0.75rem;
  cursor:pointer;

  display:flex;
  flex-flow:row nowrap;
  justify-content:space-between;
  align-items:center;

  @media (max-width:599px) {
    width:2.75rem;
  }

  &.closed {
    > span {
      visibility:visible;
    }

    @media (min-width:600px) {
    width: 6.25rem;
    &:before {
      content:'MENU';
      color:white;
      display:block;
      }
    }

    > div > span {
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
    width:2.75rem;
    
    > span {
      visibility:hidden;
    }

    > div > span {
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
    
    > div > span:first-child {
      transform: rotate(45deg);
    }
      
    > div > span:nth-child(2) {
      opacity: 0;
      height:0.8rem;
    }
    
    > div > span:last-child {
      transform: rotate(-45deg);
    }
  }
`

const Hamburger = props => {
  const { isMenuOpen, toggleMenu, closeAboutSubMenu, closeSampleMenu } = props;

  const switchMenu = e => {
    e && e.preventDefault();
    toggleMenu();
    if (!isMenuOpen) {
      closeSampleMenu();
      closeAboutSubMenu();
    }
  }
  
  return (
    <>
      <StyledHamburger onClick={switchMenu} className={isMenuOpen ? 'open' : 'closed'}>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
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

export default connect(mapStateToProps, { toggleMenu, closeAboutSubMenu, closeSampleMenu })(Hamburger)
