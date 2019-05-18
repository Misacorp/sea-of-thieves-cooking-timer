import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const id = uuid();

const Checkbox = props => {
  const { checked, onChange } = props;
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
