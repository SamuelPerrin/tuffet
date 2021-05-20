import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  table {
    table-layout: fixed;
    width: 100%;
    maxWidth: ${props => props.maxWidth}
    border-collapse: collapse;
    border: 2px solid ${props => props.theme.blue};
  }

  thead th:nth-child(1) {
    width: 10%;
  }

  thead th:nth-child(2) {
    width: 10%;
  }

  thead th:nth-child(3) {
    width: 40%;
  }

  thead th:nth-child(4) {
    width: 40%;
  }

  th, td {
    padding: 0.5rem;
  }

  tbody td {
    text-align: center;
  }

  thead th {
    background-color: ${props => props.theme.blue};
  }

  tbody tr:nth-child(odd) {
    background-color: ${props => props.theme.pale};
  }

  tbody tr:nth-child(even) {
    background-color: ${props => props.theme.gray};
  }
`

export default function Table(props) {
  const { children, maxWidth } = props;
  return (
    <TableWrapper maxWidth={maxWidth}>
      <table>
        {children}
      </table>
    </TableWrapper>
  )
}