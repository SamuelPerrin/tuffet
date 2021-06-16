import styled from 'styled-components';

const StyledListItem = styled.li`
  color: ${props => props.bulletColor};
  cursor:pointer;
  list-style-type:square;

  &.legend {
    position:relative;
  }

  &::marker {
    font-size:1.25rem;
  }
  
  &.legend::marker {
    font-size:2rem;
    margin:0;
    line-height:0;
    padding:0;
  }

  span {
    color: ${props => props.theme.black};
    font-weight: normal;
  }
  
  span.legend {
    position:absolute;
    top:-4px;
  }

  span:hover {
    border-radius: 5%;
    background:${props => props.theme.pale};
  }
`

export default function ListItemTile(props) {
  const {children, maxWidth, className, onClick, rt, ...rest} = props;

  return (
    <StyledListItem
      {...rest}
      maxWidth={maxWidth}
      className={className}
      onClick={onClick}
      data-rt={rt}
      // children={children}
    >
      <span
        rt={rt} 
        onClick={onClick}
        className={className}
      >
        {children}
      </span>
    </StyledListItem>
  )
}