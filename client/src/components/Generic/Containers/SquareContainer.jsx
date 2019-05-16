import styled from 'styled-components';

/**
 * Container that creates 2x2 square grids.
 */
const SquareContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex: 0 0 50%;

    /* We need a ::before element to enforce a square aspect ratio */
    ::before {
      content: '';
      display: table;
      padding-top: 100%;
    }
  }
`;

/**
 * SquareContainer contents should be wrapped in a SquareContent component to compensate
 * for the extra padding SquareContainer adds.
 */
const SquareContent = styled(SquareContainer)`
  margin-top: -100%;
`;

export { SquareContainer, SquareContent };
