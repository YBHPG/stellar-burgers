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

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  currentOrder: null
};

export const getFeeds = createAsyncThunk(
  'feed/fetchFeeds',
  async (_, thunkAPI) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при загрузке ленты');
    }
  }
);

export const getFeedsByNumber = createAsyncThunk(
  'feed/fetchFeedsByNumber',
  async (number: number, thunkAPI) => {
    try {
      return await getOrderByNumberApi(number);
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при загрузке заказа');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getFeedsByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getFeedsByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedSlice.reducer;
