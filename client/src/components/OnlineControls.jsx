import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Checkbox from './Generic/Checkbox';

const OnlineControls = ({ online, setOnline }) => {
  const handleChange = event => {
    setOnline(event.target.checked);
  };

  return (
    <React.Fragment>
      <span>Online</span>
      <Checkbox checked={online} onChange={handleChange} />
    </React.Fragment>
  );
};

OnlineControls.propTypes = {
  online: PropTypes.bool,
  setOnline: PropTypes.func,
};

export default OnlineControls;
