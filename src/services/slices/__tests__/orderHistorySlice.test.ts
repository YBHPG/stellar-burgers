import reducer, { getOrdersHistory, OrderState } from '../orderHistorySlice';

const mockOrders = [
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
  let initialState: OrderState;

  beforeEach(() => {
    initialState = {
      orders: [],
      isLoading: false,
      error: null
    };
  });

  it('getOrdersHistory.pending', () => {
    const action = { type: getOrdersHistory.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getOrdersHistory.fulfilled', () => {
    const action = {
      type: getOrdersHistory.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('getOrdersHistory.rejected', () => {
    const action = {
      type: getOrdersHistory.rejected.type,
      payload: 'Ошибка'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
