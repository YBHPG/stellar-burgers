import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsByNumber } from '../../services/slices/feedSlice';

export const OrderInfo: FC = ()  =>
{
    const sendAction = useDispatch();
    const { number: orderNumParam } = useParams<{ number: string }>();

    const orderPayload = useSelector((state) => state.feed.currentOrder);
    const allIngredients: TIngredient[] = useSelector(
        (state) => state.ingredients.items
    );

    useEffect(()  =>
    {
        if (orderNumParam)
        {
            sendAction(getFeedsByNumber(Number(orderNumParam)));
        }
    }, [sendAction, orderNumParam]);

    const processedOrderData = useMemo(()  =>
    {
        if (!orderPayload || !allIngredients.length)
        {
            return null;
        }

        const orderTimestamp = new Date(orderPayload.createdAt);

        type TGroupedIngredients = {
            [key: string]: TIngredient & { count: number };
        };

        const groupedIngredients = orderPayload.ingredients.reduce(
            (accumulator: TGroupedIngredients, itemId)  =>
            {
                const existingEntry = accumulator[itemId];

                if (!existingEntry)
                {
                    const matchedIngredient = allIngredients.find(
                        (ing) => ing._id  ===  itemId
                    );
                    if (matchedIngredient)
                    {
                        accumulator[itemId] = {
                            ...matchedIngredient,
                            count: 1
                        };
                    }
                } else
                {
                    existingEntry.count++;
                }

                return accumulator;
            },
            {}
        );

        const orderTotal = Object.values(groupedIngredients).reduce(
            (sum, entry) => sum + entry.price * entry.count,
            0
        );

        return {
            ...orderPayload,
            ingredientsInfo: groupedIngredients,
            date: orderTimestamp,
            total: orderTotal
        };
    }, [orderPayload, allIngredients]);

    if (!processedOrderData)
    {
        return <Preloader />;
    }

    return <OrderInfoUI orderInfo = {processedOrderData} />;
};
