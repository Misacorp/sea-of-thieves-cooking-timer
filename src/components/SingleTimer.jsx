import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import grid from 'easy-grid';

const TestContainer = styled.div`
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  margin: 0.5rem;
  opacity: 0.3;
  background-color: red;
`;

const TwoByTwoLayout = styled(grid`
    50%   50%
50% A     B
50% C     D
`)`
  background-color: blue;
  width: 100vw
  height: 100vw;
`;

const SingleTimer = () => {
  return (
    <TwoByTwoLayout>
      <TestContainer>One</TestContainer>
      <TestContainer>Two</TestContainer>
      <TestContainer>Three</TestContainer>
      <TestContainer>Four</TestContainer>
    </TwoByTwoLayout>
  );
};

export default SingleTimer;
