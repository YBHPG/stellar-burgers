import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const emptyState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: emptyState,
  reducers: {
    setBun(currentState, incomingAction: PayloadAction<TIngredient>) {
      currentState.bun = incomingAction.payload;
    },

    addIngredient: {
      reducer: (
        currentState,
        incomingAction: PayloadAction<TConstructorIngredient>
      ) => {
        currentState.ingredients.push(incomingAction.payload);
      },
      prepare: (newItem: TIngredient) => ({
        payload: { ...newItem, id: uuidv4() }
      })
    },

    removeIngredient(currentState, incomingAction: PayloadAction<string>) {
      currentState.ingredients = currentState.ingredients.filter(
        (item) => item.id !== incomingAction.payload
      );
    },

    moveIngredientUp(currentState, incomingAction: PayloadAction<string>) {
      const targetIndex = currentState.ingredients.findIndex(
        (item) => item.id === incomingAction.payload
      );
      const itemToMove = currentState.ingredients[targetIndex];
      currentState.ingredients.splice(targetIndex, 1);
      currentState.ingredients.splice(targetIndex - 1, 0, itemToMove);
    },

    moveIngredientDown(currentState, incomingAction: PayloadAction<string>) {
      const targetIndex = currentState.ingredients.findIndex(
        (item) => item.id === incomingAction.payload
      );
      const itemToMove = currentState.ingredients[targetIndex];
      currentState.ingredients.splice(targetIndex, 1);
      currentState.ingredients.splice(targetIndex + 1, 0, itemToMove);
    },

    clearConstructor(currentState) {
      currentState.bun = null;
      currentState.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
