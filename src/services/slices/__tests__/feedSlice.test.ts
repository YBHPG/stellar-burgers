import reducer, { FeedState, getFeeds, getFeedsByNumber } from '../feedSlice';

const mockOrders = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('проверка feedSlice', () => {
  let initialState: FeedState;

  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null,
      currentOrder: null
    };
  });

  it('getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getFeeds.fulfilled', () => {
    const payload = {
      orders: mockOrders,
      total: 10,
      totalToday: 2
    };
    const action = {
      type: getFeeds.fulfilled.type,
      payload
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      payload: 'Ошибка'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('getFeedsByNumber.fulfilled', () => {
    const action = {
      type: getFeedsByNumber.fulfilled.type,
      payload: { orders: mockOrders }
    };
    const state = reducer(initialState, action);
    expect(state.currentOrder).toEqual(mockOrders[0]);
    expect(state.isLoading).toBe(false);
  });
});
