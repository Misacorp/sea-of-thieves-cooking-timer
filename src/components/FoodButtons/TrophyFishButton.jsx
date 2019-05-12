import styled from 'styled-components';

import Button from './FoodButton';
import { TrophyFish } from '../../types/Foods';

/**
 * Trophy Fish cooking button.
 */
const TrophyFishButton = styled(Button).attrs({
  options: TrophyFish,
})`
  background-color: purple;
`;

export default TrophyFishButton;
