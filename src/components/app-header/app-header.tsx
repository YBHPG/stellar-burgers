import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const clientData = useSelector((globalState) => globalState.user.user);

  const clientName = clientData?.name || '';

  return <AppHeaderUI userName={clientName} />;
};
