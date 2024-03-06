import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Poem from '../../utils/Poem';
import {COLOR_SEQUENCE} from '../../constants/colors';

const StyledLine = styled.span`
  display:block;
  margin-right: 0.5rem;
  width:100%;
`
const StyledSVG = styled.svg`
  display:inline;
  max-width:10%;
`
const FlexRow = styled.div`
  display:flex;
  flex-flow:row nowrap;
  width:100%;
  justify-content:center;
`

const RhymedStanza = props => {
  const {stanzaNum, poems} = props;

  // an array of Stanzas
  const stanzaList = poems
  .map(poem => new Poem(poem).getStanzas())
  .flat();

  // the current Stanza
  const [stanza, setStanza] = useState(stanzaList[stanzaNum]);

  // an array of RhymeInfos
  const [stanzaRhymes, setStanzaRhymes] = useState(stanza.getRhymes());

  // object with data for graphing curves between lines
  const [rhymePairs, setRhymePairs] = useState([]);
  
  useEffect(() => {
    setStanza(stanzaList[stanzaNum]);
  }, [stanzaNum])
  
  useEffect(() => {
    setStanzaRhymes(stanza.getRhymes());
  },[stanza])

  let offset = useRef(80);
  // let offset = 80; // controls alignment of arcs with verses
  const breadthScalar = 0.75; // affects breadth of arcs
  const heightScalar = 0.8; // affects alignment of arcs with verses

  useEffect(() => {
    setRhymePairs(stanzaRhymes.map((rhyme,i) => {
      if (i === 0) {
        const firstBottom = Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.line1.text)[0]
          .getBoundingClientRect().bottom;
        if (firstBottom === 140) offset.current = 80;
        else if (firstBottom === 100) offset.current = 40;
        else if (firstBottom === 122) offset.current = 60;
        else if (firstBottom === 124) offset.current = -64;
        else if (firstBottom === 148) offset.current = 80;
        else if (firstBottom === 164) offset.current = -16;
        else if (firstBottom === 172) offset.current = -16;
        else if (firstBottom === 188) offset.current = -96; //for first rhyme in 2 or 3, I was using offset.current -= 4*((firstBottom - 140));
        else if (firstBottom === 196) offset.current = -112;
        else if (firstBottom === 212) offset.current = -200;
        else offset.current = 576 - 4*(firstBottom);
      }
      return {
        1: Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.line1.text)[0]
          .getBoundingClientRect().bottom - offset.current,
        2: Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.line2.text)[0]
          .getBoundingClientRect().bottom - offset.current,
      }
    }));
  }, [stanzaRhymes]);

  const seenLines = {};
  let colorsUsed = -1;

  return (
    <FlexRow>
      <div style={{marginLeft:'0.3rem'}}>
        {stanza.lines.map(line => <StyledLine className='rhymedLine' key={line.text}>{line.text}</StyledLine>)}
      </div>
      <StyledSVG>
        <g fill={'none'} strokeWidth={3}>
          {rhymePairs.map((pair, i) => {
            if (stanzaRhymes.length > i) {
              if (stanzaRhymes.length > i && stanzaRhymes[i].line1.text in seenLines) {
                seenLines[stanzaRhymes[i].line2.text] = seenLines[stanzaRhymes[i].line1.text]
              } else if (stanzaRhymes.length > i) {
                colorsUsed += 1;
                seenLines[stanzaRhymes[i].line2.text] = COLOR_SEQUENCE[colorsUsed % COLOR_SEQUENCE.length];
              }
              
              return (
              <path 
                d = {`M ${0},${pair[1] - rhymePairs[0][1] * heightScalar}
                      C ${breadthScalar * (pair[2] - pair[1])},${pair[1] - rhymePairs[0][1] * heightScalar}
                      ${breadthScalar * (pair[2] - pair[1])},${pair[2] - rhymePairs[0][1] * heightScalar}
                      ${0},${pair[2] - rhymePairs[0][1] * heightScalar}`}
                stroke={stanzaRhymes[i].line1.text in seenLines ? seenLines[stanzaRhymes[i].line1.text] : COLOR_SEQUENCE[colorsUsed % COLOR_SEQUENCE.length]}
                key={stanzaRhymes[i].line1.text}
              />)
            }
          })}
        </g>
      </StyledSVG>
    </FlexRow>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
    poems: state.poems,
    stanzaNum: state.stanzaNum,
  }
}

export default connect(mapStateToProps, {})(RhymedStanza);