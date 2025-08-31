import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export function ProtectedRoute({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) {
  const isLoggedIn = useSelector((store) => store.user.user);
  const isLoading = useSelector((store) => store.user.isLoading);
  const location = useLocation();
  const from = location.state?.from || '/';

  // Если загрузка пользователя еще не завершена показать предлоадер
  if (!isLoading) return <Preloader />;

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (onlyUnAuth && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} replace />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!onlyUnAuth && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
