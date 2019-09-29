import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import getBackgroundColor from './getBackgroundColor';

const GraphicStructure = ({ className }) => {
  return <div className={className} />;
};

const Graphic = styled(GraphicStructure)`
  ${({ location }) => {
    const { pathname } = location;

    const bgColor = getBackgroundColor(pathname);

    return css`
      background-color: ${bgColor};
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      user-select: none;
      pointer-events: none;
    `;
  }}
`;

GraphicStructure.propTypes = {
  className: PropTypes.string,
};

export default withRouter(Graphic);