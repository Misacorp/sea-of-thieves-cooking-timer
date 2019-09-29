import React, { useState, useCallback } from 'react';

import { ONLINE_ROOT, OFFLINE } from '../../types/routes';
import LinkButton from '../Generic/LinkButton';
import Radio from '../Generic/Radio/Radio';
import Row from '../Generic/Containers/Row';

/**
 * Welcome page for new users.
 * Displays option to use the timers offline or online.
 */
const Welcome = () => {
  const options = ['Solo', 'Crew'];
  const defaultSelection = options[0];
  const [selected, select] = useState(defaultSelection);

  // Handle change of radio input.
  const handleChange = useCallback(
    newIndex => () => select(options[newIndex]),
    [select, options],
  );

  return (
    <>
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
        <LinkButton to={OFFLINE} variant="inline">
          Offline
        </LinkButton>
        <LinkButton to={ONLINE_ROOT} variant="inline">
          Online
        </LinkButton>
      </Row>
    </>
  );
};

export default Welcome;
