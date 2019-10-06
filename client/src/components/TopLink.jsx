import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TopLinkStructure = ({ className }) => {
  return (
    <div className={className}>
      <a href="//misacorp.io">misacorp.io</a>
    </div>
  );
};

const TopLink = styled(TopLinkStructure)`
  display: block;
  text-align: center;
  padding: 1rem;
  padding-top: 2rem;
  text-transform: uppercase;
  opacity: 0.5;
  font-size: 0.8rem;
  letter-spacing: 0.1em;

  a {
    &,
    &:visited,
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
      color: ${({ theme }) => theme.palette.typography.light};
    }
  }
`;

TopLinkStructure.propTypes = {
  className: PropTypes.string,
};

export default TopLink;
