import { FC, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { setCurrentIngredient } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, currentIngredient } = useSelector(
    (state) => state.ingredients
  );
  /** TODO: взять переменную из стора */
  useEffect(() => {
    if (items.length && id) {
      const ingredient = items.find((item) => item._id === id);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      }
    }
  }, [items, id, dispatch]);

  if (!currentIngredient) return <Preloader />;

  return <IngredientDetailsUI ingredientData={currentIngredient} />;
};
