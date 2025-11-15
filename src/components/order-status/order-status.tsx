import React from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusDisplayMap: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

const statusColorMap: { [key: string]: string } = {
  pending: '#E52B1A',
  done: '#00CCCC',
  created: '#F2F2F3'
};

export function OrderStatus({ status }: OrderStatusProps) {
  const colorStyle = statusColorMap[status] || '#F2F2F3';

  const displayText = statusDisplayMap[status];

  return <OrderStatusUI textStyle={colorStyle} text={displayText} />;
}
