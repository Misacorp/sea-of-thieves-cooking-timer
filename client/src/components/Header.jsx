import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../assets/icons/home.svg';
import { ROOT } from '../types/routes';

const HeaderContent = ({ location, className }) => {
  if (location.pathname === ROOT) {
    return null;
  }

  return (
    <div className={className}>
      <Link to={ROOT}>
        <BackIcon fill="white" />
      </Link>
    </div>
  );
};

HeaderContent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  className: PropTypes.string,
};

const Header = styled(HeaderContent)`
  background-color: transparent;
  display: inline-block;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;

  ${Link} {
    display: inline-block;
    margin: 0;
    padding: 1rem;
    box-sizing: border-box;
  }
`;

export default withRouter(Header);
