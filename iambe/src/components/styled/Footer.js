import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import tuffetlogo3 from '../../images/tuffetlogo3.png';

const StyledFooter = styled.footer`
  position: absolute;
  right:0;
  bottom: 0;
  left: 0;
  width: 100%;
  padding:1rem;
  margin-top:1rem;
  background-color:${props => props.theme.blue};
  color:${props => props.theme.white};
  display:flex;
  justify-content:center;

  .content {
    display:flex;
    flex-flow:row wrap;
    justify-content:space-between;
    align-items:center;
    max-width:1200px;
    min-width:50%;
  }
`

const FooterColumn = styled.div`
  display:flex;
  flex-flow:column nowrap;
  margin:0 1rem 0 0;

  &.wrappable {
    padding-top:1rem;
    padding-bottom:1rem;
  }
`

const Footer = props => {
  const { currentUser } = props;

  return (
    <StyledFooter>
      <div className='content'>
        <FooterColumn>
          <Link to='/'>
            <img src={tuffetlogo3} alt='Tuffet logo' width='50px' height='50px' />
          </Link>
        </FooterColumn>
        <FooterColumn>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          {currentUser ? <Link to='/my-poems'>My Poems</Link> : <Link to='/samples'>Samples</Link>}
        </FooterColumn>
        <FooterColumn className='wrappable'>
          <a href='https://www.github.com/SamuelPerrin/tuffet/' target='_blank' rel='noreferrer'>GitHub</a>
        </FooterColumn>
        <FooterColumn className='wrappable'>
          &copy; Sam Perrin 2021
        </FooterColumn>
      </div>
    </StyledFooter>
  )
}

const mapStateToProps = state => {
  return ({
    currentUser: state.currentUser,
  })
}

export default connect(mapStateToProps, {})(Footer)