import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Poem from '../../utils/Poem';
import Stanza from '../../utils/Stanza';
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
  const stanzaList = poems.map(poem => new Poem(poem).getStanzas()).flat();
  const [stanza, setStanza] = useState(stanzaList[stanzaNum].split('\n')); // stanza should be an array of strings
  const [stanzaRhymes, setStanzaRhymes] = useState(new Stanza(stanza.join('\n')).getRhymes());
  const [rhymePairs, setRhymePairs] = useState([]);
  // console.log("at top: stanzaList",stanzaList);
  
  useEffect(() => {
    // console.log("in stanza effect hook, I have stanzaNum", stanzaNum);
    setStanza(stanzaList[stanzaNum].split('\n'));
  }, [stanzaNum])
  
  useEffect(() => {
    // console.log("in stanzaRhymes effect hook, I have stanza",stanza);
    setStanzaRhymes(new Stanza(stanza.join('\n')).getRhymes());
  },[stanza])

  // console.log("after two hooks: stanza", stanza, "stanzaNum", stanzaNum);
  let offset = useRef(80);
  // let offset = 80; // controls alignment of arcs with verses
  const breadthScalar = 0.75; // affects breadth of arcs
  const heightScalar = 0.8; // affects alignment of arcs with verses

  useEffect(() => {
    setRhymePairs(stanzaRhymes.map((rhyme,i) => {
      if (i === 0) {
        const firstBottom = Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.lines[0])[0]
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
        // console.log("for line",rhyme.lines[i],"firstBottom:",firstBottom);
        // console.log("offset.current",offset.current);
      }
      return {
        1: Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.lines[0])[0]
          .getBoundingClientRect().bottom - offset.current,
        2: Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.lines[1])[0]
          .getBoundingClientRect().bottom - offset.current,
      }
    }));
  }, [stanzaRhymes]);

  const seenLines = {};
  let colorsUsed = -1;

  return (
    <FlexRow>
      <div style={{marginLeft:'0.3rem'}}>
        {stanza.map(line => <StyledLine className='rhymedLine'>{line}</StyledLine>)}
      </div>
      <StyledSVG>
        <g fill={'none'} strokeWidth={3}>
          {/* {console.log("in render: rhymePairs",rhymePairs);} */}
          {rhymePairs.map((pair, i) => {
            if (stanzaRhymes.length > i) {
              // console.log("in render: stanzaRhymes",stanzaRhymes,"stanzaRhymes[i]",stanzaRhymes[i]);
              if (stanzaRhymes.length > i && stanzaRhymes[i].lines[0] in seenLines) {
                seenLines[stanzaRhymes[i].lines[1]] = seenLines[stanzaRhymes[i].lines[0]]
              } else if (stanzaRhymes.length > i) {
                colorsUsed += 1;
                seenLines[stanzaRhymes[i].lines[1]] = COLOR_SEQUENCE[colorsUsed % COLOR_SEQUENCE.length];
              }
              
              return (
              <path 
                d = {`M ${0},${pair[1] - rhymePairs[0][1] * heightScalar}
                      C ${breadthScalar * (pair[2] - pair[1])},${pair[1] - rhymePairs[0][1] * heightScalar}
                      ${breadthScalar * (pair[2] - pair[1])},${pair[2] - rhymePairs[0][1] * heightScalar}
                      ${0},${pair[2] - rhymePairs[0][1] * heightScalar}`}
                stroke={stanzaRhymes[i].lines[0] in seenLines ? seenLines[stanzaRhymes[i].lines[0]] : COLOR_SEQUENCE[colorsUsed % COLOR_SEQUENCE.length]}
                key={stanzaRhymes[i].lines[0]}
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