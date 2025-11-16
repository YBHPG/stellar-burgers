import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TOrdersData, TUser } from './types';

const API_BASE_URL = process.env.BURGER_API_URL;

const validateResponse = <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((error) => Promise.reject(error));
};

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${API_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset = utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((response) => validateResponse<TRefreshResponse>(response))
    .then((tokenPayload) => {
      if (!tokenPayload.success) {
        return Promise.reject(tokenPayload);
      }
      localStorage.setItem('refreshToken', tokenPayload.refreshToken);
      setCookie('accessToken', tokenPayload.accessToken);
      return tokenPayload;
    });

export const fetchWithRefresh = async <T>(
  endpoint: RequestInfo,
  config: RequestInit
) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      authorization: getCookie('accessToken') || ''
    }
  };
  try {
    const initialResponse = await fetch(endpoint, newConfig);
    return await validateResponse<T>(initialResponse);
  } catch (error) {
    const isJwtError = (error as { message: string }).message === 'jwt expired';
    if (isJwtError) {
      const newAuthData = await refreshToken();
      (newConfig.headers as { [key: string]: string }).authorization =
        newAuthData.accessToken;
      const retryResponse = await fetch(endpoint, newConfig); // Теперь запрос уйдет с обновленным токеном
      return await validateResponse<T>(retryResponse);
    } else {
      return Promise.reject(error);
    }
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

export const getIngredientsApi = () =>
  fetch(`${API_BASE_URL}/ingredients`)
    .then((response) => validateResponse<TIngredientsResponse>(response))
    .then((payload) =>
      payload?.success ? payload.data : Promise.reject(payload)
    );

export const getFeedsApi = () =>
  fetch(`${API_BASE_URL}/orders/all`)
    .then((response) => validateResponse<TFeedsResponse>(response))
    .then((payload) => (payload?.success ? payload : Promise.reject(payload)));

export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>(`${API_BASE_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((payload) =>
    payload?.success ? payload.orders : Promise.reject(payload)
  );

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (ingredientIds: string[]) =>
  fetchWithRefresh<TNewOrderResponse>(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  }).then((payload) => (payload?.success ? payload : Promise.reject(payload)));

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumberApi = (orderId: number) =>
  fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => validateResponse<TOrderResponse>(response));

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (registrationData: TRegisterData) =>
  fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset = utf-8'
    },
    body: JSON.stringify(registrationData)
  })
    .then((response) => validateResponse<TAuthResponse>(response))
    .then((payload) => (payload?.success ? payload : Promise.reject(payload)));

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (loginData: TLoginData) =>
  fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset = utf-8'
    },
    body: JSON.stringify(loginData)
  })
    .then((response) => validateResponse<TAuthResponse>(response))
    .then((payload) => (payload?.success ? payload : Promise.reject(payload)));

export const forgotPasswordApi = (emailData: { email: string }) =>
  fetch(`${API_BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset = utf-8'
    },
    body: JSON.stringify(emailData)
  })
    .then((response) => validateResponse<TServerResponse<{}>>(response))
    .then((payload) => (payload?.success ? payload : Promise.reject(payload)));

export const resetPasswordApi = (resetData: {
  password: string;
  token: string;
}) =>
  fetch(`${API_BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset = utf-8'
    },
    body: JSON.stringify(resetData)
  })
    .then((response) => validateResponse<TServerResponse<{}>>(response))
    .then((payload) => (payload?.success ? payload : Promise.reject(payload)));

export type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${API_BASE_URL}/auth/user`, {
    method: 'GET'
  });

export const updateUserApi = (userData: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${API_BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    } as HeadersInit,
    body: JSON.stringify(userData)
  });

export const logoutApi = () =>
  fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset = utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((response) => validateResponse<TServerResponse<{}>>(response));
