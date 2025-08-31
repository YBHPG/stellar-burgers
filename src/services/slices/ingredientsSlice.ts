import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  items: TIngredient[];
  currentIngredient: TIngredient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  currentIngredient: null,
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при загрузке ингредиентов');
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.items = action.payload;
    },
    setCurrentIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setIngredients, setCurrentIngredient, clearCurrentIngredient } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
