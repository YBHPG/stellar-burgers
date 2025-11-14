import reducer, { clearOrder, createOrder, OrderState } from '../orderSlice';

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

describe('orderSlice', () => {
  let emptyState: OrderState;

  beforeEach(() => {
    emptyState = {
      order: null,
      isLoading: false,
      error: null
    };
  });

  it('createOrder.pending', function () {
    const dispatchedAction = { type: createOrder.pending.type };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(true);
    expect(resultingState.error).toBe(null);
  });

  it('createOrder.fulfilled', function () {
    const dispatchedAction = {
      type: createOrder.fulfilled.type,
      payload: testOrderData
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.order).toEqual(testOrderData);
  });

  it('createOrder.rejected', function () {
    const dispatchedAction = {
      type: createOrder.rejected.type,
      payload: 'Ошибка создания заказа'
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.error).toBe('Ошибка создания заказа');
  });

  it('clearOrder', function () {
    const dispatchedAction = { type: clearOrder.type };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.order).toBe(null);
  });
});
