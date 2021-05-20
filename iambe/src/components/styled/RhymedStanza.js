import React, {useEffect, useState} from 'react';
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
  width:20%;
`
const FlexRow = styled.div`
  display:flex;
  flex-flow:row nowrap;

`

const RhymedStanza = props => {
  const {stanza} = props; // stanza should be a list of strings
  const [rhymePairs, setRhymePairs] = useState([]);
  const stanzaRhymes = new Stanza(stanza.join('\n')).getRhymes();
  const offset = 20; // controls alignment of arcs with verses
  const breadthScalar = 0.75; // affects breadth of arcs
  const heightScalar = 0.8; // affects alignment of arcs with verses

  useEffect(() => {
    setRhymePairs(stanzaRhymes.map(rhyme => {
      return {
        1: Array.from(document.querySelectorAll('span'))
          .filter(x => x.innerHTML === rhyme.lines[0])[0]
          .getBoundingClientRect().bottom - offset,
        2: Array.from(document.querySelectorAll('span'))
          .filter(x => x.innerHTML === rhyme.lines[1])[0]
          .getBoundingClientRect().bottom - offset,
      }
    }))
  }, []);

  const seenLines = {};
  let colorsUsed = -1;

  return (
    <FlexRow>
      <div>
        {stanza.map(line => <StyledLine>{line}</StyledLine>)}
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
              key={i}
            />
          )})}
        </g>
      </StyledSVG>
    </FlexRow>
  )
}

export default RhymedStanza;