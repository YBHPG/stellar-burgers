import reducer, {
  TConstructorState,
  addIngredient,
  removeIngredient,
  moveIngredientUp
} from '../burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

const testBun = {
  _id: '1',
  id: uuidv4(),
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
};

const testSauce = {
  _id: '2',
  id: uuidv4(),
  name: 'Соус',
  type: 'sauce',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 40,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('Проверка burgerConstructorSlice', () => {
  let emptyState: TConstructorState;

  beforeEach(() => {
    emptyState = {
      bun: null,
      ingredients: []
    };
  });

  it('rootReducer', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(emptyState);
  });

  it('addIngredient', () => {
    const resultingState = reducer(emptyState, addIngredient(testSauce));
    expect(resultingState.ingredients.length).toBe(1);
    expect(resultingState.ingredients[0]._id).toBe(testSauce._id);
  });

  it('removeIngredient', () => {
    const prefilledState = {
      ...emptyState,
      ingredients: [testSauce]
    };
    const resultingState = reducer(
      prefilledState,
      removeIngredient(testSauce.id)
    );
    expect(resultingState.ingredients.length).toBe(0);
  });

  it('moveIngredientUp', () => {
    const multiItemState = {
      ...emptyState,
      ingredients: [testBun, testSauce]
    };
    const resultingState = reducer(
      multiItemState,
      moveIngredientUp(testSauce.id)
    );
    expect(resultingState.ingredients.map((item) => item._id)).toEqual([
      testSauce._id,
      testBun._id
    ]);
  });
});
