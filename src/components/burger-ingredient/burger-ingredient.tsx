import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
    addIngredient,
    setBun
} from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
    function BurgerItem({ ingredient: item, count: quantity })
    {
        const sendAction = useDispatch();
        const currentLocation = useLocation();

        const onAddItem = ()  =>
        {
            item.type  ===  'bun'
                ? sendAction(setBun(item))
                : sendAction(addIngredient(item));
        };

        return (
            <BurgerIngredientUI
                ingredient = {item}
                count = {quantity}
                locationState = {{ background: currentLocation }}
                handleAdd = {onAddItem}
            />
        );
    }
);
