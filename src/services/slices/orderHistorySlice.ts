import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export type OrderState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getOrdersHistory = createAsyncThunk(
  'orders/getOrders',
  async (_, thunkAPI) => {
    try {
      const res = await getOrdersApi();
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default orderHistorySlice.reducer;
