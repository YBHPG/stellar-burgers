import reducer, { FeedState, getFeeds, getFeedsByNumber } from '../feedSlice';

const testOrderData = [
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
  let emptyState: FeedState;

  beforeEach(() => {
    emptyState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null,
      currentOrder: null
    };
  });

  it('getFeeds.pending', function () {
    const dispatchedAction = { type: getFeeds.pending.type };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(true);
    expect(resultingState.error).toBe(null);
  });

  it('getFeeds.fulfilled', function () {
    const responseData = {
      orders: testOrderData,
      total: 10,
      totalToday: 2
    };
    const dispatchedAction = {
      type: getFeeds.fulfilled.type,
      payload: responseData
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.orders).toEqual(testOrderData);
    expect(resultingState.total).toBe(10);
    expect(resultingState.totalToday).toBe(2);
  });

  it('getFeeds.rejected', function () {
    const dispatchedAction = {
      type: getFeeds.rejected.type,
      payload: 'Ошибка'
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.error).toBe('Ошибка');
  });

  it('getFeedsByNumber.fulfilled', function () {
    const dispatchedAction = {
      type: getFeedsByNumber.fulfilled.type,
      payload: { orders: testOrderData }
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.currentOrder).toEqual(testOrderData[0]);
    expect(resultingState.isLoading).toBe(false);
  });
});
