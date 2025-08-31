import reducer, {
  TConstructorState,
  addIngredient,
  removeIngredient,
  moveIngredientUp
} from '../burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

const mockBun = {
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

const mockMain = {
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
  let initialState: TConstructorState;

  beforeEach(() => {
    initialState = {
      bun: null,
      ingredients: []
    };
  });

  it('rootReducer', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('addIngredient', () => {
    const nextState = reducer(initialState, addIngredient(mockMain));
    expect(nextState.ingredients.length).toBe(1);
    expect(nextState.ingredients[0]._id).toBe(mockMain._id);
  });

  it('removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [mockMain]
    };
    const nextState = reducer(
      stateWithIngredient,
      removeIngredient(mockMain.id)
    );
    expect(nextState.ingredients.length).toBe(0);
  });

  it('moveIngredientUp', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockBun, mockMain]
    };
    const nextState = reducer(
      stateWithIngredients,
      moveIngredientUp(mockMain.id)
    );
    expect(nextState.ingredients.map((i) => i._id)).toEqual([
      mockMain._id,
      mockBun._id
    ]);
  });
});
