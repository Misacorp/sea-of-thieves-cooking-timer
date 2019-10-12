import styled from 'styled-components';

import Radio from './Radio';

/**
 * Sets two radio buttons side by side so that they meet in the middle.
 */
const AdjacentRadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  ${Radio} {
    flex-basis: 50%;

    &:first-of-type {
      text-align: right;
    }
    &:last-of-type {
      text-align: left;
    }
  }
`;

export default AdjacentRadioGroup;
