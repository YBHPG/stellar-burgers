import reducer, { getIngredients, IngredientsState } from '../ingredientsSlice';

const mockIngredients = [
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

describe('проверка ingredientsSlice', () => {
  let initialState: IngredientsState;

  beforeEach(() => {
    initialState = {
      items: [],
      currentIngredient: null,
      isLoading: false,
      error: null
    };
  });

  it('getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getIngredients.fulfilled', () => {
    const payload = mockIngredients;
    const action = {
      type: getIngredients.fulfilled.type,
      payload
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(payload);
  });

  it('getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
