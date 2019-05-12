import styled from 'styled-components';

import Button from './FoodButton';
import { Meat } from '../../types/Foods';

/**
 * Meat cooking button.
 */
const MeatButton = styled(Button).attrs({
  options: Meat,
})`
  background-color: palegoldenrod;
`;

export default MeatButton;
