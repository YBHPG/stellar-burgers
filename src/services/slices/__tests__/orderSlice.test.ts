import reducer, { clearOrder, createOrder, OrderState } from '../orderSlice';

const mockOrder = [
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
  let initialState: OrderState;

  beforeEach(() => {
    initialState = {
      order: null,
      isLoading: false,
      error: null
    };
  });

  it('createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it('createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка создания заказа'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });
  
  it('clearOrder', () => {
    const action = { type: clearOrder.type };
    const state = reducer(initialState, action);
    expect(state.order).toBe(null);
  });
});
