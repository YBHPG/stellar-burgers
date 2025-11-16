import reducer, { getIngredients, IngredientsState } from '../ingredientsSlice';

const testIngredientData = [
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
  let emptyState: IngredientsState;

  beforeEach(() => {
    emptyState = {
      items: [],
      currentIngredient: null,
      isLoading: false,
      error: null
    };
  });

  it('getIngredients.pending', function () {
    const dispatchedAction = { type: getIngredients.pending.type };
    const resultingState = reducer(emptyState, dispatchedAction);

    expect(resultingState.isLoading).toBe(true);
    expect(resultingState.error).toBe(null);
  });

  it('getIngredients.fulfilled', function () {
    const responseData = testIngredientData;
    const dispatchedAction = {
      type: getIngredients.fulfilled.type,
      payload: responseData
    };
    const resultingState = reducer(emptyState, dispatchedAction);

    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.items).toEqual(responseData);
  });

  it('getIngredients.rejected', function () {
    const dispatchedAction = {
      type: getIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const resultingState = reducer(emptyState, dispatchedAction);

    expect(resultingState.isLoading).toBe(false);
    expect(resultingState.error).toBe('Ошибка загрузки');
  });
});
