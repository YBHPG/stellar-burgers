import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export interface UserState {
  user: TUser | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | unknown;
}

const emptyUserState: UserState = {
  user: null,
  isLoading: false,
  isAuth: false,
  error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const apiResponse = await getUserApi();
  console.log(apiResponse);
  return apiResponse;
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async function (_unused, asyncApi) {
    try {
      const authResponse = await getUserApi();
      return authResponse.user;
    } catch (authError) {
      return asyncApi.rejectWithValue('Не авторизован');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async function (
    credentials: { email: string; password: string; name: string },
    asyncApi
  ) {
    const { email, password, name } = credentials;
    try {
      const regResponse = await registerUserApi({ email, password, name });
      setCookie('accessToken', regResponse.accessToken);
      localStorage.setItem('refreshToken', regResponse.refreshToken);
      return regResponse.user;
    } catch (regError) {
      return asyncApi.rejectWithValue('Ошибка регистрации');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function (loginData: { email: string; password: string }, asyncApi) {
    const { email, password } = loginData;
    try {
      const loginResponse = await loginUserApi({ email, password });
      localStorage.setItem('refreshToken', loginResponse.refreshToken);
      setCookie('accessToken', loginResponse.accessToken);
      return loginResponse.user;
    } catch (loginError) {
      return asyncApi.rejectWithValue('Ошибка авторизации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async function (_payload, asyncApi) {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '');
    } catch (logoutError) {
      return asyncApi.rejectWithValue('Ошибка при выходе');
    }
  }
);

export const updateUserThunk = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/updateUser', async function (dataToUpdate, asyncApi) {
  try {
    const updateResponse = await updateUserApi(dataToUpdate);
    return updateResponse.user;
  } catch (updateError: any) {
    return asyncApi.rejectWithValue('Ошибка при обновлении данных');
  }
});

export const userSlice = createSlice({
  name: 'user',

  initialState: emptyUserState,

  reducers: {
    setUser(currentState, incomingAction: PayloadAction<TUser>) {
      currentState.user = incomingAction.payload;
    },
    logout(currentState) {
      currentState.user = null;
    }
  },

  extraReducers: (reducerBuilder) => {
    reducerBuilder.addCase(
      loginUser.fulfilled,
      (currentState, incomingAction) => {
        currentState.user = incomingAction.payload;
      }
    );
    reducerBuilder.addCase(registerUser.pending, (currentState) => {
      currentState.isLoading = true;
      currentState.error = null;
    });
    reducerBuilder.addCase(
      registerUser.fulfilled,
      (currentState, incomingAction) => {
        currentState.user = incomingAction.payload;
        currentState.isLoading = false;
      }
    );
    reducerBuilder.addCase(
      registerUser.rejected,
      (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.error = incomingAction.payload;
      }
    );
    reducerBuilder.addCase(
      checkAuth.fulfilled,
      (currentState, incomingAction) => {
        currentState.user = incomingAction.payload;
        currentState.isAuth = true;
        currentState.isLoading = true;
      }
    );
    reducerBuilder.addCase(checkAuth.rejected, (currentState) => {
      currentState.user = null;
      currentState.isAuth = false;
      currentState.isLoading = true;
    });
    reducerBuilder.addCase(logoutUser.fulfilled, (currentState) => {
      currentState.user = null;
    });
    reducerBuilder.addCase(
      updateUserThunk.fulfilled,
      (currentState, incomingAction) => {
        currentState.user = incomingAction.payload;
        currentState.isAuth = true;
        currentState.isLoading = false;
      }
    );
    reducerBuilder.addCase(
      updateUserThunk.rejected,
      (currentState, incomingAction) => {
        currentState.isLoading = false;
        currentState.isAuth = false;
        currentState.error = incomingAction.payload ?? 'Ошибка';
      }
    );
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
