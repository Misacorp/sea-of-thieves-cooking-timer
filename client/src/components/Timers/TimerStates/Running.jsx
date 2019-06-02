import React from 'react';
import PropTypes from 'prop-types';

const Running = ({ food, timeLeft, className }) => {
  return (
    <div className={className}>
      <p>{food} is cooking</p>
      <h2>{timeLeft}</h2>
    </div>
  );
};

Running.propTypes = {
  food: PropTypes.string,
  timeLeft: PropTypes.number,
  className: PropTypes.string,
};

export default Running;
