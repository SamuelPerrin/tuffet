import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { deletePoemById } from '../../api-client/auth';

import { BlueSpan, YellowSpan } from './Spans';
import ButtonRow from './ButtonRow';
import Button from './Button';
import HoverCard from './HoverCard';

const StyledPoem = styled.div`
  height:13rem;
  width:18rem;
  border: 1px solid black;
  border-radius: 3%;
  padding: ${props => props.theme.space};
  margin: 0.25rem;
  overflow:hidden;
  position:relative;
  z-index:1;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    z-index:2;
  }
  
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    z-index:2;
  }

  div.lines {
    max-height:4.5rem;
    overflow:hidden;
    z-index:2;
  }

  .buttons {
    background-color:white;
    width:100%;
    margin:0;
    padding:0;
    position:static;
    
    button {
      width:100%;
      margin:0.5rem;
    }
  }

  .attr {
    color: ${props => props.theme.gray};
  }

  .flexRow {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index:2;
  }

  .menu {
    text-align:right;
    position: relative;

    .menu-button {
      font-size:1.5rem;
      transform: rotate(180deg);
      display:block;
      line-height: 0.5;

      &:hover {
        cursor:pointer;
        text-shadow: 0px 0px 3px ${props => props.theme.gray};
      }

      &.open {
        transform: rotate(0deg);
        background-color: ${props => props.theme.white};
        font-size:1rem;
      }
    }
  } 

  .closed-menu {
    visibility:hidden;
    opacity:0;
  }
  
  .open-menu {
    visibility:visible;
    opacity:1;
    background-color: ${props => props.theme.pale};
    padding:2px;
    position:relative;
    bottom:10.5rem;
    left:8rem;
    z-index:3;
    width:50%;
    
    .menu-item {
      cursor: pointer;

      &:hover {
        background-color: ${props => props.theme.darkPale};
      }
    }
  }
`;

const PoemTile = props => {
  const { poem, getRhymes, getMeter, getCurrentUser, fetchCurrentUser, filterPoemsByAuthor, filtered, refresh, setRefresh, setLoading } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();

  const toggleOpenMenu = () => setOpenMenu(!openMenu);

  const submitRhymes = poem => {
    getRhymes(poem);
    history.push('/rhyme');
  }

  const submitMeter = poem => {
    getMeter(poem);
    history.push('/meter');
  }

  const updatePoem = id => {
    history.push(`/edit/poem/${id}`);
  }

  const deletePoem = async id => {
    setLoading(true);
    await deletePoemById(id);
    getCurrentUser(await fetchCurrentUser());
    setLoading(false);
    setRefresh(refresh + 1);
    window.scrollTo(0,0);
  }

  return (
    <StyledPoem>
      <div className='flexRow'>
        <h3><BlueSpan>{poem.title ? poem.title : "Untitled"}</BlueSpan></h3>
        <div className='menu' onClick={toggleOpenMenu}>
          <span className={openMenu ? 'menu-button open' : 'menu-button'}>{openMenu ? 'x' : '...'}</span>
        </div>
      </div>
      <em className='attr'>by&nbsp;
        <HoverCard hoverText={filtered ? "" : "Click to filter poems by author"}>
          <YellowSpan onClick={filterPoemsByAuthor} style={filtered ? {} : {cursor:"pointer"}}>
            {poem.author ? poem.author : "Anonymous"}
          </YellowSpan>
        </HoverCard>
      </em>
      <div className="lines">
        {poem.text.split('\n').map((line, i) => i < 2 ? <p key={i}>{line}</p> : null)}
        {poem.text.split('\n').length > 2 ? <p>...</p> : null}
      </div>
      <ButtonRow className="buttons">
        <Button onClick={() => submitRhymes(poem.text)}>Get Rhymes</Button>
        <Button onClick={() => submitMeter(poem.text)}>Get Meter</Button>
      </ButtonRow>
      {openMenu && 
        <div className={openMenu ? 'open-menu' : 'closed-menu'}>
          <div className='menu-item' onClick={() => updatePoem(poem.poemid)}>Edit poem</div>
          <div className='menu-item' onClick={() => deletePoem(poem.poemid)}>Delete poem</div>
        </div>}
    </StyledPoem>
  )
}

export default PoemTile;
