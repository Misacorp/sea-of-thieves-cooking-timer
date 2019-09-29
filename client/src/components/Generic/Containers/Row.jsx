import styled, { css } from 'styled-components';

/**
 * Row component that can be aligned left, right or center.
 */
const Row = styled.div`
  clear: both;
  display: block;

  ${({ center }) =>
    center &&
    css`
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    `}

    
  ${({ left }) =>
    left &&
    css`
      text-align: left;
      margin-left: 0;
      margin-right: auto;
    `}

    
  ${({ right }) =>
    right &&
    css`
      text-align: right;
      margin-left: auto;
      margin-right: 0;
    `}
`;

export default Row;
