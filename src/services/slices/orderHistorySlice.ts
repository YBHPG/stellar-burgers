import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export type OrderState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const emptyState: OrderState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getOrdersHistory = createAsyncThunk(
  'orders/getOrders',
  async function (_, asyncApi) {
    try {
      const responseData = await getOrdersApi();
      return responseData;
    } catch (err) {
      return asyncApi.rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);

const userOrderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: emptyState,
  reducers: {},
  extraReducers: (reducerBuilder) => {
    reducerBuilder.addCase(getOrdersHistory.pending, (currentState) => {
      currentState.isLoading = true;
      currentState.error = null;
    });
    reducerBuilder.addCase(
      getOrdersHistory.fulfilled,
      (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.orders = incomingAction.payload;
      }
    );
    reducerBuilder.addCase(
      getOrdersHistory.rejected,
      (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.error = incomingAction.payload as string;
      }
    );
  }
});

export default userOrderHistorySlice.reducer;
