import styled from 'styled-components';

import Button from './FoodButton';
import { Fish } from '../../types/Foods';

/**
 * Button to start cooking fish.
 */
const FishButton = styled(Button).attrs({
  options: Fish,
})`
  background-color: lightblue;
`;

export default FishButton;
