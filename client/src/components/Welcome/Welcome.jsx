import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ls from 'local-storage';

import { ONLINE_ROOT, OFFLINE } from '../../types/routes';
import LinkButton from '../Generic/Buttons/LinkButton';
import Radio from '../Generic/Radio/Radio';
import Row from '../Generic/Containers/Row';

const lsKey = 'crewType';

/**
 * Welcome page for new users.
 * Displays option to use the timers offline or online.
 */
const WelcomeStructure = ({ className }) => {
  const options = ['Solo', 'Crew'];
  const savedSelection = ls.get(lsKey);
  const defaultSelection = options[savedSelection || 0];
  const [selected, select] = useState(defaultSelection);

  // Handle change of radio input.
  const handleChange = useCallback(
    newIndex => () => {
      select(options[newIndex]);
      ls.set(lsKey, newIndex);
    },
    [select, options],
  );

  return (
    <div className={className}>
      <Row center>
        <Radio
          align="right"
          label={options[0]}
          group="How would you like to cook?"
          checked={selected === options[0]}
          onChange={handleChange(0)}
        />
        <Radio
          align="left"
          label={options[1]}
          group="How would you like to cook?"
          checked={selected === options[1]}
          onChange={handleChange(1)}
        />
      </Row>

      <Row center>
        <LinkButton
          to={selected === 'Crew' ? ONLINE_ROOT : OFFLINE}
          variant="inline"
        >
          Go
        </LinkButton>
      </Row>
    </div>
  );
};

const Welcome = styled(WelcomeStructure)`
  ${LinkButton} {
    padding-left: 5rem;
    padding-right: 5rem;
  }
`;

WelcomeStructure.propTypes = {
  className: PropTypes.string,
};

export default Welcome;