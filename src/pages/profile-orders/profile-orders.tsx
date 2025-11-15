import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersHistory } from '../../services/slices/orderHistorySlice';

export function ProfileOrders() {
  const sendAction = useDispatch();

  const userOrders: TOrder[] = useSelector(
    (globalState) => globalState.orderHistory.orders
  );

  useEffect(() => {
    sendAction(getOrdersHistory());
  }, [sendAction]);

  return <ProfileOrdersUI orders={userOrders} />;
}
