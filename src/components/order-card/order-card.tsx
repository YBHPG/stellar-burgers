import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';

const MAX_DISPLAY_ITEMS = 6;

export const OrderCard: FC<OrderCardProps> = memo(function OrderCard({
  order
}) {
  const currentLocation = useLocation();

  const allIngredients: TIngredient[] = useSelector(
    (globalState) => globalState.ingredients.items
  );

  const processedOrderData = useMemo(() => {
    if (!allIngredients.length) {
      return null;
    }

    const hydratedIngredients = order.ingredients.reduce(
      (list: TIngredient[], id: string) => {
        const matchedIngredient = allIngredients.find((ing) => ing._id === id);
        if (matchedIngredient) {
          list.push(matchedIngredient);
        }
        return list;
      },
      []
    );

    const orderTotal = hydratedIngredients.reduce(
      (sum, entry) => sum + entry.price,
      0
    );

    const displayIngredients = hydratedIngredients.slice(0, MAX_DISPLAY_ITEMS);

    const overflowCount =
      hydratedIngredients.length > MAX_DISPLAY_ITEMS
        ? hydratedIngredients.length - MAX_DISPLAY_ITEMS
        : 0;

    const orderTimestamp = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo: hydratedIngredients,
      ingredientsToShow: displayIngredients,
      remains: overflowCount,
      total: orderTotal,
      date: orderTimestamp
    };
  }, [order, allIngredients]);

  return processedOrderData ? (
    <OrderCardUI
      orderInfo={processedOrderData}
      maxIngredients={MAX_DISPLAY_ITEMS}
      locationState={{ background: currentLocation }}
    />
  ) : null;
});
