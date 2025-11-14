import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

function filterOrdersByStatus(allOrders: TOrder[], targetStatus: string): number[]
{

    const relevantOrders = allOrders.filter(
        (order) => order.status  ===  targetStatus
    );

    const orderNumbers = relevantOrders.map((order) => order.number);

    return orderNumbers.slice(0, 20);
}

export const FeedInfo: FC = ()  =>
{
    const { orders: orderList, total: grandTotal, totalToday: todayTotal } = useSelector((globalState) => globalState.feed);

    const statistics = { total: grandTotal, totalToday: todayTotal };

    const completedOrders = filterOrdersByStatus(orderList, 'done');
    const inProgressOrders = filterOrdersByStatus(orderList, 'pending');

    return (
        <FeedInfoUI
            readyOrders = {completedOrders}
            pendingOrders = {inProgressOrders}
            feed = {statistics}
        />
    );
};
