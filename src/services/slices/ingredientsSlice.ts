import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  items: TIngredient[];
  currentIngredient: TIngredient | null;
  isLoading: boolean;
  error: string | null;
}

const emptyState: IngredientsState = {
  items: [],
  currentIngredient: null,
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, asyncApi) => {
    try {
      return await getIngredientsApi();
    } catch (err) {
      console.error('Ошибка при загрузке ингредиентов:', err);
      return asyncApi.rejectWithValue('Ошибка при загрузке ингредиентов');
    }
  }
);

export const ingredientDataSlice = createSlice({
  name: 'ingredients',
  initialState: emptyState,
  reducers: {
    setIngredients: (
      currentState,
      incomingAction: PayloadAction<TIngredient[]>
    ) => {
      currentState.items = incomingAction.payload;
    },
    setCurrentIngredient: (
      currentState,
      incomingAction: PayloadAction<TIngredient>
    ) => {
      currentState.currentIngredient = incomingAction.payload;
    },
    clearCurrentIngredient: (currentState) => {
      currentState.currentIngredient = null;
    }
  },
  extraReducers: (reducerBuilder) => {
    reducerBuilder
      .addCase(getIngredients.pending, (currentState) => {
        currentState.isLoading = true;
        currentState.error = null;
      })
      .addCase(getIngredients.fulfilled, (currentState, incomingAction) => {
        currentState.items = incomingAction.payload;
        currentState.isLoading = false;
      })
      .addCase(getIngredients.rejected, (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.error = incomingAction.payload as string;
      });
  }
});

export const { setIngredients, setCurrentIngredient, clearCurrentIngredient } =
  ingredientDataSlice.actions;

export default ingredientDataSlice.reducer;
