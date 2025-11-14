import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
    HTMLUListElement,
    TIngredientsCategoryProps
>(function IngredientsCategory({ title, titleRef, ingredients: categoryItems }, ref)
{
    const { burgerConstructor: constructorState } = useSelector((state) => state);

    const ingredientCounts = useMemo(()  =>
    {
        const { bun: currentBun, ingredients: constructorIngredients } = constructorState;
        const counters: { [key: string]: number } = {};

        for (const item of constructorIngredients)
        {
            counters[item._id] = (counters[item._id] || 0) + 1;
        }

        if (currentBun)
        {
            counters[currentBun._id] = 2;
        }
        return counters;
    }, [constructorState]);

    return (
        <IngredientsCategoryUI
            title = {title}
            titleRef = {titleRef}
            ingredients = {categoryItems}
            ingredientsCounters = {ingredientCounts}
            ref = {ref}
        />
    );
});
