import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getRhymes, getMeter, toggleMenu, toggleAboutSubMenu, closeAboutSubMenu } from '../../actions';

const StyledMenu = styled.div`
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
        padding-right:${props => props.theme.space};
      }
    }
  }
`

const NavMenu = props => {
  const { poetry, isMenuOpen, isAboutOpen, getRhymes, getMeter, toggleMenu, toggleAboutSubMenu, closeAboutSubMenu } = props;
  const history = useHistory();

  const switchMenu = e => {
    e && e.preventDefault();
    toggleMenu();
    if (!isMenuOpen && isAboutOpen) closeAboutSubMenu();
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
    <StyledMenu className={isMenuOpen ? 'open' : 'closed'}>
      <span onClick={() => goToURI('/')} className={'menu-item'}>Home</span>
      <span className='menu-item super-item' onClick={() => toggleAboutSubMenu()}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span onClick={() => goToURI('/about')}>About</span>
          <span className='symbol'>
            {isAboutOpen ? '–' : '+'}
          </span>
        </div>
        <div className={isAboutOpen ? 'open' : 'closed'}>
          <span onClick={() => goToURI('/about')} className='menu-item sub-item'>About Tuffet</span>
          <span onClick={() => goToURI('/about/rhymes')} className='menu-item sub-item'>About Rhyme</span>
          <span onClick={() => goToURI('/about/meter')} className='menu-item sub-item'>About Meter</span>
        </div>
      </span>
      {poetry && <span onClick={goToRhymes} className='menu-item'>Rhyme</span>}
      {poetry && <span onClick={goToMeter} className='menu-item'>Meter</span>}
    </StyledMenu>
)
}

const mapStateToProps = state => {
  return {
    poetry: state.poetry,
    isMenuOpen: state.isMenuOpen,
    isAboutOpen: state.isAboutOpen,
  }
}

export default connect(mapStateToProps, { getRhymes, getMeter, toggleMenu, toggleAboutSubMenu, closeAboutSubMenu })(NavMenu);
