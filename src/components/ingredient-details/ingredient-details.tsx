import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { setCurrentIngredient } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
    const sendAction = useDispatch();
    const { id: paramId } = useParams();

    const { items: allIngredients, currentIngredient: selectedItem } = useSelector(
        (globalState) => globalState.ingredients
    );

    useEffect(() => {
        const hasIngredients = allIngredients.length > 0;
        if (hasIngredients && paramId) {
            const matchedItem = allIngredients.find(
                (entry) => entry._id  ===  paramId
            );

            if (matchedItem) {
                sendAction(setCurrentIngredient(matchedItem));
            }
        }
    }, [allIngredients, paramId, sendAction]);

    return selectedItem ? (
        <IngredientDetailsUI ingredientData = {selectedItem} />
    ) : (
        <Preloader />
    );
};
