import styled from 'styled-components';

import Button from './FoodButton';
import { MonsterMeat } from '../../types/Foods';

/**
 * Monster meat cooking button.
 */
const MonsterMeatButton = styled(Button).attrs({
  options: MonsterMeat,
})`
  background-color: pink;
`;

export default MonsterMeatButton;
