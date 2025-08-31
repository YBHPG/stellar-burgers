import reducer, {
  checkAuth,
  loginUser,
  logout,
  logoutUser,
  registerUser,
  setUser,
  updateUserThunk,
  UserState
} from '../userSlice';

const mockUser = {
  name: 'John Doe',
  email: 'johndoe@example.com'
};

describe('userSlice', () => {
  let initialState: UserState;

  beforeEach(() => {
    initialState = {
      user: null,
      isLoading: false,
      isAuth: false,
      error: null
    };
  });

  it('loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Ошибка регистрации'
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка регистрации');
    expect(state.isLoading).toBe(false);
  });

  it('checkAuth.fulfilled', () => {
    const action = { type: checkAuth.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('updateUserThunk.fulfilled', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('updateUserThunk.rejected', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      payload: 'Ошибка'
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка');
    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('logoutUser.fulfilled', () => {
    const filledState = {
      ...initialState,
      user: mockUser,
      isAuth: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(filledState, action);
    expect(state.user).toBe(null);
  });

  it('reducer setUser', () => {
    const action = setUser(mockUser);
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('reducer logout', () => {
    const filledState = { ...initialState, user: mockUser };
    const state = reducer(filledState, logout());
    expect(state.user).toBe(null);
  });
});
