import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';

export function Feed()
{
    const sendAction = useDispatch();
    const feedOrders: TOrder[] = useSelector((globalState) => globalState.feed.orders);

    useEffect(()  =>
    {
        sendAction(getFeeds());
    }, [sendAction]);

    const handleRefresh = ()  =>
    {
        sendAction(getFeeds());
    };

    return !feedOrders.length ? (
        <Preloader />
    ) : (
        <FeedUI
            orders = {feedOrders}
            handleGetFeeds = {handleRefresh}
        />
    );
};
