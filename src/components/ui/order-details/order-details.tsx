import React from 'react';
import styles from './order-details.module.css';
import doneImg from '../../../images/done.svg';
import { OrderDetailsUIProps } from './type';

export const OrderDetailsUI: React.FC<OrderDetailsUIProps> = ({
  orderNumber
}) => (
  <>
    <h2 className={`text text_type_digits-large ${styles.title} mb-8`}>
      {orderNumber}
    </h2>
    <img
      className={styles.img}
      src={doneImg}
      alt='изображение статуса заказа.'
    />
    <p className='text text_type_main-default mb-1'>
      Ваш заказ начали готовить
    </p>
    <p className={`${styles.text} text text_type_main-default`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);
