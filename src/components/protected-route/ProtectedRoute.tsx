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
  const isAuthenticated = useSelector((state) => state.user.user);
  const isPending = useSelector((state) => state.user.isLoading);
  const currentRoute = useLocation();

  const originPath = currentRoute.state?.from ? currentRoute.state.from : '/';

  if (isPending) {
    return <Preloader />;
  }

  if (onlyUnAuth === true && isAuthenticated) {
    return <Navigate to={originPath} replace />;
  }

  if (onlyUnAuth === false && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: currentRoute }} replace />;
  }

  return children;
}
