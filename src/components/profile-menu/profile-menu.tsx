import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';

export function ProfileMenu() {
  const { pathname: activeRoute } = useLocation();
  const storeDispatch = useDispatch();

  const logoutHandler = () => {
    storeDispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={logoutHandler} pathname={activeRoute} />;
}
