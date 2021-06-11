import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';

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
  const {stanza} = props; // stanza should be a list of strings
  const [rhymePairs, setRhymePairs] = useState([]);
  let offset = useRef(80);
  const stanzaRhymes = new Stanza(stanza.join('\n')).getRhymes();
  // let offset = 80; // controls alignment of arcs with verses
  const breadthScalar = 0.75; // affects breadth of arcs
  const heightScalar = 0.8; // affects alignment of arcs with verses

  useEffect(() => {
    setRhymePairs(stanzaRhymes.map((rhyme,i) => {
      if (i === 0) {
        const firstBottom = Array.from(document.querySelectorAll('span.rhymedLine'))
          .filter(x => x.innerHTML === rhyme.lines[0])[0]
          .getBoundingClientRect().bottom;
        if (firstBottom > 140) offset.current -= 4*((firstBottom - 140));
        else if (firstBottom === 124) offset.current = -64;
        // console.log("firstBottom:",firstBottom);
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
    // console.log(`stanzaRhymes:`, stanzaRhymes);
    // console.log(`rhymePairs:`, stanzaRhymes.map(rhyme => {
    //   return {
    //     1: Array.from(document.querySelectorAll('span.rhymedLine'))
    //       .filter(x => x.innerHTML === rhyme.lines[0])[0]
    //       .getBoundingClientRect().bottom - offset.current,
    //     2: Array.from(document.querySelectorAll('span.rhymedLine'))
    //       .filter(x => x.innerHTML === rhyme.lines[1])[0]
    //       .getBoundingClientRect().bottom - offset.current,
    //   }}));
  }, []);

  const seenLines = {};
  let colorsUsed = -1;

  return (
    <FlexRow>
      <div style={{marginLeft:'0.3rem'}}>
        {stanza.map(line => <StyledLine className='rhymedLine'>{line}</StyledLine>)}
      </div>
      <StyledSVG>
        <g fill={'none'} strokeWidth={3}>
          {rhymePairs.map((pair, i) => {
            if (stanzaRhymes[i].lines[0] in seenLines) {
              seenLines[stanzaRhymes[i].lines[1]] = seenLines[stanzaRhymes[i].lines[0]]
            } else {
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
            />
          )})}
        </g>
      </StyledSVG>
    </FlexRow>
  )
}

export default RhymedStanza;