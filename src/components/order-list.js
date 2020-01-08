import React from 'react';
import Order from './order';

export default function OrderList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Orders 
  //    2)  change order status from pending to ready and back
  //    3)  delete Order from list
  //    4)  select and show Order detail   

const orders = props.orders;
return (
      <div>
        <ul className="order-list">
          {orders.map((order, index) => (
            <Order
              key={index}
              index={index}
              order={order}
            />
          ))}
        </ul>
      </div>
    );
}
