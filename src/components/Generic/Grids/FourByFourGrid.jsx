import styled from 'styled-components';

import grid from 'easy-grid';

const GridBase = grid`
    50%   50%
50% A     B
50% C     D
`;

const Grid = styled(GridBase)`
  width: calc(100vw - 1rem);
  height: calc(100vw - 1rem);
  margin: 0.5rem;
`;

export default Grid;
