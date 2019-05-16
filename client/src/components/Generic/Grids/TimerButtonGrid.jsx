import styled from 'styled-components';
import grid from 'easy-grid';

const GridBase = grid`
    50% 50%
50% A   B
50% C   D
`;

const Grid = styled(GridBase)`
  width: 100%;
  height: 100%;
`;

export default Grid;
