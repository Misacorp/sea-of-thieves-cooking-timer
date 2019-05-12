import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderContent = ({ className }) => {
  return (
    <div className={className}>
      <h1>Cooking Timer</h1>
    </div>
  );
};

HeaderContent.propTypes = {
  className: PropTypes.string,
};

const Header = styled(HeaderContent)`
  height: 50px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: black;

  h1 {
    margin: 0;
    padding: 0.5rem 0.25rem;
    text-align: center;
  }
`;

export default Header;
