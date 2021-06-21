import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getRhymes, getMeter, toggleMenu } from '../../actions';

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

const Menu = styled.div`
  position: absolute;
  width: calc(100% - 3rem);
  left: 50%;
  top:50%;
  transform: translateX(-50%);
  background: ${props => props.theme.pale};
  margin-top: 1.5rem;
  /* padding: 1.625rem; */
  border-radius: 5px;
  border: 1px solid ${props => props.theme.black};
  color: ${props => props.theme.black};

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
    cursor:pointer;

    &:hover {
      border:1px solid black;
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
      background: ${props => props.theme.purple};
      color: ${props => props.theme.white};
    }

    &.super-item{
      .symbol {
        padding-left:2rem;
      }
    }
  }
`

const Hamburger = props => {
  const { poetry, getRhymes, getMeter, isMenuOpen, toggleMenu } = props;
  // const [open, setOpen] = useState(false);
  const [expandAbout, setExpandAbout] = useState(false);
  const history = useHistory();

  const switchMenu = e => {
    e && e.preventDefault();
    toggleMenu();
    if (!isMenuOpen) setExpandAbout(false);
  }

  const goToURI = (uri) => {
    switchMenu();
    history.push(uri);
  }

  const goToRhymes = () => {
    switchMenu();
    getRhymes(poetry);
    history.push('/rhyme');
  }

  const goToMeter = () => {
    getMeter(poetry);
    switchMenu();
    history.push('/meter');
  }
  
  return (
    <>
      <StyledHamburger onClick={switchMenu} className={isMenuOpen ? 'open hide-for-desktop' : 'closed hide-for-desktop'}>
        <span></span>
        <span></span>
        <span></span>
      </StyledHamburger>

      <Menu className={isMenuOpen ? 'open' : 'closed'}>
        <span onClick={() => goToURI('/')} className={'menu-item'}>Home</span>
        <span className='menu-item super-item' onClick={() => setExpandAbout(!expandAbout)}>
          <span onClick={() => goToURI('/about')}>About</span>
          <span onClick={() => setExpandAbout(!expandAbout)} className='symbol'>
            {expandAbout ? '–' : '+'}
          </span>
          <div className={expandAbout ? 'open' : 'closed'}>
            <span onClick={() => goToURI('/about')} className='menu-item sub-item'>About Tuffet</span>
            <span onClick={() => goToURI('/about/rhymes')} className='menu-item sub-item'>About Rhyme</span>
            <span onClick={() => goToURI('/about/meter')} className='menu-item sub-item'>About Meter</span>
          </div>
        </span>
        {poetry && <span onClick={goToRhymes} className='menu-item'>Rhyme</span>}
        {poetry && <span onClick={goToMeter} className='menu-item'>Meter</span>}
      </Menu>
    </>
  )
}

const mapStateToProps = state => {
  return {
    poetry: state.poetry,
    isMenuOpen: state.isMenuOpen,
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter, toggleMenu })(Hamburger)
