import styled from 'styled-components';
import grid from 'easy-grid';

const GridBase = grid`
    50% 50%
40% A   B
40% C   D
20% E   E
`;

const Grid = styled(GridBase)`
  width: 100%;
  height: 100%;
`;

export default Grid;
