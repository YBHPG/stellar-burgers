import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  function BurgerElement({
    ingredient: item,
    index: position,
    totalItems: count
  }) {
    const sendAction = useDispatch();

    function onMoveDown() {
      sendAction(moveIngredientDown(item.id));
    }

    function onMoveUp() {
      sendAction(moveIngredientUp(item.id));
    }

    const onClose = () => {
      sendAction(removeIngredient(item.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={item}
        index={position}
        totalItems={count}
        handleMoveUp={onMoveUp}
        handleMoveDown={onMoveDown}
        handleClose={onClose}
      />
    );
  }
);
