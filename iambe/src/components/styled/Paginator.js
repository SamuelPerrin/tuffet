import React, { useState, useEffect } from 'react';
import ButtonRow from './ButtonRow';
import Button from './Button';

const Paginator = props => {
  const { data, perPage, Item, ...rest } = props;
  const [lot, setLot] = useState(0);
  const lotData = data.slice(lot * perPage, (lot + 1) * perPage);
  const lastLot = Math.ceil(data.length / perPage) - 1;

  const crement = amt => {
    setLot(lot + amt);
    window.scrollTo(0,0);
  }

  useEffect(() => {
    setLot(0);
  }, [props.refresh])

  return (
    <>
      <div style={{display:"flex", flexFlow:"row wrap", justifyContent:"space-evenly"}}>
        {lotData.map(x => (
          <Item
            key={x.poem.text}
            poem={x.poem}
            {...rest}
          />
          ))}
      </div>
      {data.length > perPage && 
        <div>
          <p style={{fontWeight:"bold", textAlign:"center"}}>
            {lot * perPage + 1}–{lot * perPage + lotData.length} of {data.length}:
          </p>
          <ButtonRow>
            {lot > 1 && <Button size="x-small" variant="inverted" onClick={() => crement(-lot)}>&lt;&lt;</Button>}
            {lot !== 0 && <Button size="x-small" variant="inverted" onClick={() => crement(-1)}>{lot}</Button>}
            <Button size="x-small" style={{fontWeight: "bold"}}>
              {lot + 1}
            </Button>
            {lot !== lastLot && <Button size="x-small" variant="inverted" onClick={() => crement(1)}>{lot + 2}</Button>}
            {lot < lastLot - 1 && <Button size="x-small" variant="inverted" onClick={() => crement(lastLot - lot)}>&gt;&gt;</Button>}
          </ButtonRow>
        </div>
      }
    </>
  )
}

export default Paginator;
