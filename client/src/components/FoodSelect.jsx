import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { SquareContent } from './Generic/Containers/SquareContainer';
import FishButton from './FoodButtons/FishButton';
import TrophyFishButton from './FoodButtons/TrophyFishButton';
import MeatButton from './FoodButtons/MeatButton';
import MonsterMeatButton from './FoodButtons/MonsterMeatButton';

/**
 * Food selection container.
 * Should eventually hold state for what is being cooked and show a Button when a food has been selected.
 */
const FoodSelect = ({ className }) => {
  const [food, setFood] = useState(null);

  let content = null;

  // If no food has been selected, let the user select what they want to cook.
  if (!food) {
    content = (
      <React.Fragment>
        <FishButton onClick={() => setFood('FISH')} />
        <TrophyFishButton onClick={() => setFood('TROPHY_FISH')} />
        <MeatButton onClick={() => setFood('MEAT')} />
        <MonsterMeatButton onClick={() => setFood('MONSTER_MEAT')} />
      </React.Fragment>
    );
  }

  // Otherwise only show the respective Button (man this is some bad structure)
  else {
    switch (food) {
      case 'FISH':
        content = <FishButton />;
        break;
      case 'TROPHY_FISH':
        content = <TrophyFishButton />;
        break;
      case 'MEAT':
        content = <MeatButton />;
        break;
      case 'MONSTER_MEAT':
        content = <MonsterMeatButton />;
        break;
      default:
        content = <div>wat</div>;
    }
  }

  return (
    <div className={className}>
      <SquareContent>{content}</SquareContent>
    </div>
  );
};

FoodSelect.propTypes = {
  className: PropTypes.string,
};

export default FoodSelect;
