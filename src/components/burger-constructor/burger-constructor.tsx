import { useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, createOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';

export function BurgerConstructor() {
  const sendAction = useDispatch();
  const navigator = useNavigate();

  const { bun: topAndBottom, ingredients: innerItems } = useSelector(
    (fullState) => fullState.burgerConstructor
  );
  const { order: currentOrder, isLoading: isProcessing } = useSelector(
    (fullState) => fullState.order
  );
  const client = useSelector((fullState) => fullState.user);

  const burgerContent = { bun: topAndBottom, ingredients: innerItems };
  const isOrderPending = isProcessing;
  const orderPopupData = currentOrder;

  function handlePlaceOrder() {
    if (!client.user) {
      navigator('/login');
      return;
    }

    if (!topAndBottom || isOrderPending) {
      return;
    }

    const fullIngredientList = [
      topAndBottom._id,
      ...innerItems.map((i) => i._id),
      topAndBottom._id
    ];
    sendAction(createOrder(fullIngredientList));
  }

  const onModalCloseHandler = function () {
    sendAction(clearOrder());
    sendAction(clearConstructor());
  };

  const totalCost = useMemo(
    () =>
      (topAndBottom ? topAndBottom.price * 2 : 0) +
      innerItems.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [topAndBottom, innerItems]
  );

  return (
    <BurgerConstructorUI
      price={totalCost}
      orderRequest={isOrderPending}
      constructorItems={burgerContent}
      orderModalData={orderPopupData}
      onOrderClick={handlePlaceOrder}
      closeOrderModal={onModalCloseHandler}
    />
  );
}
