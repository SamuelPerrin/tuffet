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
`
const FlexRow = styled.div`
  display:flex;
  flex-flow:row nowrap;

`

const RhymedStanza = props => {
  const {stanza} = props; // stanza should be a list of strings
  const [rhymePairs, setRhymePairs] = useState([]);
  const firstLine = !!Array.from(document.querySelector('span'))
  .filter(x => x.innerHTML === stanzaRhymes[0].lines[0]).length;
  console.log('stanza', stanza, stanza.length)
  const stanzaRhymes = new Stanza(stanza.join('\n')).getRhymes();
  const offset = 16;

  console.log(`firstLine is ${firstLine} because span is ${Array.from(document.querySelector('span'))
  .filter(x => x.innerHTML === stanzaRhymes[0].lines[0])[0]}`)
  // const rhymePairs = firstLine ? stanzaRhymes.map(rhyme => {
  //   return {
  //     1: Array.from(document.querySelectorAll('span'))
  //       .filter(x => x.innerHTML === rhyme.lines[0])[0]
  //       .getBoundingClientRect().bottom - offset,
  //     2: Array.from(document.querySelectorAll('span'))
  //       .filter(x => x.innerHTML === rhyme.lines[1])[0]
  //       .getBoundingClientRect().bottom - offset,
  //   }
  // }) : [1,2,3,4,5];

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
  }, [])

  return (
    <FlexRow>
      <div>
        {stanza.map(line => <StyledLine>{line}</StyledLine>)}
      </div>
      <StyledSVG>
        <g fill={'none'} strokeWidth={3}>
          {console.log(`rendering arcs from rhymePairs`, rhymePairs)}
          {rhymePairs.map((line, i) => (
            <path 
              d = {`M ${0},${line[1] - rhymePairs[0][1] * 0.85}
                    C ${50},${line[1] - rhymePairs[0][1] * 0.85}
                    ${50},${line[2] - rhymePairs[0][1] * 0.85}
                    ${0},${line[2] - rhymePairs[0][1] * 0.85}`}
              // d = {`M ${0},${35*i} C ${50},${35*i} ${50},${35*i + 50} ${0},${35*i + 50}`}
              stroke={COLOR_SEQUENCE[i % rhymePairs.length]}
              key={i}
            />
          ))}
        </g>
      </StyledSVG>
    </FlexRow>
  )
}

export default RhymedStanza;