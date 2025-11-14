import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
  currentOrder: TOrder | null;
};

const emptyState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  currentOrder: null
};

export const getFeeds = createAsyncThunk(
  'feed/fetchFeeds',
  async (_, asyncApi) => {
    try {
      return await getFeedsApi();
    } catch (err) {
      return asyncApi.rejectWithValue('Ошибка при загрузке ленты');
    }
  }
);

export const getFeedsByNumber = createAsyncThunk(
  'feed/fetchFeedsByNumber',
  async (orderId: number, asyncApi) => {
    try {
      return await getOrderByNumberApi(orderId);
    } catch (err) {
      return asyncApi.rejectWithValue('Ошибка при загрузке заказа');
    }
  }
);

const feedDataSlice = createSlice({
  name: 'feed',
  initialState: emptyState,
  reducers: {},
  extraReducers: (reducerBuilder) => {
    reducerBuilder
      .addCase(getFeeds.pending, (currentState) => {
        currentState.isLoading = true;
        currentState.error = null;
      })
      .addCase(getFeeds.fulfilled, (currentState, incomingAction) => {
        currentState.orders = incomingAction.payload.orders;
        currentState.total = incomingAction.payload.total;
        currentState.totalToday = incomingAction.payload.totalToday;
        currentState.isLoading = false;
      })
      .addCase(getFeeds.rejected, (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.error = incomingAction.payload as string;
      })
      .addCase(getFeedsByNumber.pending, (currentState) => {
        currentState.isLoading = true;
        currentState.error = null;
      })
      .addCase(getFeedsByNumber.fulfilled, (currentState, incomingAction) => {
        currentState.currentOrder = incomingAction.payload.orders[0];
        currentState.isLoading = false;
      })
      .addCase(getFeedsByNumber.rejected, (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.error = incomingAction.payload as string;
      });
  }
});

export default feedDataSlice.reducer;
