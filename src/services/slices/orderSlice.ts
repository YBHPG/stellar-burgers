import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { clearConstructor } from './burgerConstructorSlice';

export interface OrderState {
  order: { number: number } | null; // Храним только номер заказа
  isLoading: boolean;
  error: string | null;
}

const emptyState: OrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async function (itemIds: string[], asyncApi) {
    try {
      const response = await orderBurgerApi(itemIds);
      asyncApi.dispatch(clearConstructor());
      return { number: response.order.number }; // Возвращаем только номер
    } catch (error) {
      return asyncApi.rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: emptyState,
  reducers: {
    clearOrder: (currentState) => {
      currentState.order = null;
    }
  },
  extraReducers(reducerBuilder) {
    reducerBuilder
      .addCase(createOrder.pending, (currentState) => {
        currentState.isLoading = true;
        currentState.error = null;
      })
      .addCase(createOrder.fulfilled, (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.order = incomingAction.payload;
      })
      .addCase(createOrder.rejected, (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.error = incomingAction.payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
