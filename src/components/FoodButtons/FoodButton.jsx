import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FoodButton = ({ options, className, onClick }) => {
  const { duration, title } = options;

  return (
    <button type="button" className={className} onClick={onClick}>
      <div>
        {duration}
        <br />
        {title}
      </div>
    </button>
  );
};

FoodButton.propTypes = {
  options: PropTypes.shape({
    duration: PropTypes.number,
    title: PropTypes.string,
  }),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const Timer = styled(FoodButton)`
  position: relative;
  margin: 0;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  /* show a hand cursor on hover; some argue that we
  should keep the default arrow cursor for buttons */
  cursor: pointer;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

export default Timer;
