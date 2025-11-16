import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';

import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { Provider } from 'react-redux';

import store, { useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { checkAuth } from '../../services/slices/userSlice';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={styles.app}>
          <AppHeader />
          <RouterLogic />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

function RouterLogic() {
  const currentLocation = useLocation();
  const navigation = useNavigate();
  const sendAction = useDispatch();

  const modalOrigin = currentLocation.state?.background;
  const profileRouteId = useMatch('/profile/orders/:number')?.params.number;
  const feedRouteId = useMatch('/feed/:number')?.params.number;
  const activeOrderNum = profileRouteId || feedRouteId;

  useEffect(() => {
    sendAction(getIngredients());
    sendAction(checkAuth());
  }, [sendAction]);

  return (
    <>
      <Routes location={modalOrigin || currentLocation}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div style={{ marginTop: '120px' }}>
              <IngredientDetails />
            </div>
          }
        />
      </Routes>

      {modalOrigin && (
        <Routes>
          {['/feed/:number', '/profile/orders/:number'].map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <Modal
                  title={`#${String(activeOrderNum).padStart(6, '0')}`}
                  onClose={() => navigation(-1)}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          ))}
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigation(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}
    </>
  );
}
