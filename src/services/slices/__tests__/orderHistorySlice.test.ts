import reducer, { getOrdersHistory, OrderState } from '../orderHistorySlice';

const testOrderData = [
  {
    _id: 'order1',
    number: 111111,
    name: 'Космический бургер',
    status: 'done',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ingredients: ['buns']
  }
];

describe('orderHistorySlice', () => {
  let emptyState: OrderState;

  beforeEach(() => {
    emptyState = {
      orders: [],
      isLoading: false,
      error: null
    };
  });

  it('getOrdersHistory.pending', function () {
    const dispatchedAction = { type: getOrdersHistory.pending.type };
    const resultingState = reducer(emptyState, dispatchedAction);

    expect(resultingState.isLoading).toBe(true);
    expect(resultingState.error).toBe(null);
  });

  it('getOrdersHistory.fulfilled', function () {
    const dispatchedAction = {
      type: getOrdersHistory.fulfilled.type,
      payload: testOrderData
    };
    const resultingState = reducer(emptyState, dispatchedAction);

    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.orders).toEqual(testOrderData);
  });

  it('getOrdersHistory.rejected', function () {
    const dispatchedAction = {
      type: getOrdersHistory.rejected.type,
      payload: 'Ошибка'
    };
    const resultingState = reducer(emptyState, dispatchedAction);

    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.error).toBe('Ошибка');
  });
});
