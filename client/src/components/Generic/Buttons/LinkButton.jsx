import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import buttonStyle from './buttonStyle';

/**
 * Button that renders a link.
 */
const LinkButtonBase = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

const LinkButton = styled(LinkButtonBase)`
  ${buttonStyle};

  text-decoration: none;
`;

LinkButtonBase.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default LinkButton;
