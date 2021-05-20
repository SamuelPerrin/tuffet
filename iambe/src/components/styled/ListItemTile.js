import styled from 'styled-components';

const StyledListItem = styled.li`
  &:hover {
    border-radius: 5%;
    background:${props => props.theme.pale};
    cursor:pointer;
  }
`

export default function ListItemTile(props) {
  const {children, maxWidth, className, onClick, rt} = props;

  return (
    <StyledListItem maxWidth={maxWidth} className={className} onClick={onClick} data-rt={rt} children={children} />
  )
}