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

const testClient = {
  name: 'John Doe',
  email: 'johndoe@example.com'
};

describe('userSlice', () => {
  let emptyState: UserState;

  beforeEach(() => {
    emptyState = {
      user: null,
      isLoading: false,
      isAuth: false,
      error: null
    };
  });

  it('loginUser.fulfilled', function () {
    const dispatchedAction = {
      type: loginUser.fulfilled.type,
      payload: testClient
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.user).toEqual(testClient);
  });

  it('registerUser.pending', function () {
    const dispatchedAction = { type: registerUser.pending.type };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.isLoading).toBe(true);
    expect(resultingState.error).toBe(null);
  });

  it('registerUser.fulfilled', function () {
    const dispatchedAction = {
      type: registerUser.fulfilled.type,
      payload: testClient
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.user).toEqual(testClient);
    expect(resultingState.isLoading).toBe(false);
  });

  it('registerUser.rejected', function () {
    const dispatchedAction = {
      type: registerUser.rejected.type,
      payload: 'Ошибка регистрации'
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.error).toBe('Ошибка регистрации');
    expect(resultingState.isLoading).toBe(false);
  });

  it('checkAuth.fulfilled', function () {
    const dispatchedAction = {
      type: checkAuth.fulfilled.type,
      payload: testClient
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.user).toEqual(testClient);
    expect(resultingState.isAuth).toBe(true);
  });

  it('updateUserThunk.fulfilled', function () {
    const dispatchedAction = {
      type: updateUserThunk.fulfilled.type,
      payload: testClient
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.user).toEqual(testClient);
    expect(resultingState.isAuth).toBe(true);
    expect(resultingState.isLoading).toBe(false);
  });

  it('updateUserThunk.rejected', function () {
    const dispatchedAction = {
      type: updateUserThunk.rejected.type,
      payload: 'Ошибка'
    };
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.error).toBe('Ошибка');
    expect(resultingState.isAuth).toBe(false);
    expect(resultingState.isLoading).toBe(false);
  });

  it('logoutUser.fulfilled', function () {
    const prefilledState = {
      ...emptyState,
      user: testClient,
      isAuth: true
    };
    const dispatchedAction = { type: logoutUser.fulfilled.type };
    const resultingState = reducer(prefilledState, dispatchedAction);
    expect(resultingState.user).toBe(null);
  });

  it('reducer setUser', function () {
    const dispatchedAction = setUser(testClient);
    const resultingState = reducer(emptyState, dispatchedAction);
    expect(resultingState.user).toEqual(testClient);
  });

  it('reducer logout', function () {
    const prefilledState = { ...emptyState, user: testClient };
    const resultingState = reducer(prefilledState, logout());
    expect(resultingState.user).toBe(null);
  });
});
