import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../assets/icons/home.svg';
import { ROOT } from '../types/routes';

const HeaderContent = ({ className }) => {
  return (
    <div className={className}>
      <Link to={ROOT}>
        <BackIcon fill="white" />
      </Link>
    </div>
  );
};

HeaderContent.propTypes = {
  className: PropTypes.string,
};

const Header = styled(HeaderContent)`
  background-color: transparent;
  display: block;
  width: 100%;
  padding: 0;
  box-sizing: border-box;

  ${Link} {
    display: inline-block;
    margin: 0;
    padding: 1rem;
    box-sizing: border-box;
  }
`;

export default Header;
