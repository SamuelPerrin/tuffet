import React from 'react';
import styled from 'styled-components';

import HoverCard from './HoverCard';

import Line from '../../utils/Line';
import {METER_NAMES} from '../../utilsTS/phonstants';

const LineTileWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  font-size: ${props => props.theme.fontSize};
  padding: 0.5rem;

  &:hover {
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.pale};
    cursor: pointer;
  }
`

const LineTile = props => {
  const {children, onClick, rt} = props;
  
  const line = new Line(children);
  const meterData = line.getMeter();
  const label = meterData.label.rhythm + " " +  METER_NAMES[meterData.label.meter] + (meterData.label.catalexis ? " catalectic" : "");

  return (
    <LineTileWrapper>
      <HoverCard hoverText={label}>
        <p id={rt} onClick={onClick}>{line.text}</p>
      </HoverCard>
    </LineTileWrapper>
  )
}

export default LineTile;