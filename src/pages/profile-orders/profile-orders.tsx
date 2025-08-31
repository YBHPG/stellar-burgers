import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersHistory } from '../../services/slices/orderHistorySlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orderHistory.orders);

  useEffect(() => {
    dispatch(getOrdersHistory());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
