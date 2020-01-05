import React, { Fragment, useState } from 'react';

export default function OrderList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Orders 
  //    2)  change order status from pending to ready and back
  //    3)  delete Order from list
  //    4)  select and show Order detail   

  const orders = props.orders;
  console.log('order-list props.orders: ', props.orders);
  const Order = ({ order }) => 
  <li className="order">
   <p><span className="bold"> # </span>{order.orderNumber} </p>
   <p><span className="bold"> Recipient: </span>{ order.destination.recipient} </p>
   <p><span className="bold"> Pickup Status: </span>{order.pickup.pickupStatus}<br/>{order.pickup.updatedAt}  </p>
   <p><span className="bold"> Delivery Status: </span>{order.delivery.deliveryStatus}<br/>{order.delivery.updatedAt} </p>  
  </li>;    //Order component

    return (
      <Fragment>
        <ul className="order-list">
          {orders.map((order, index) => (
            <Order
              key={index}
              index={index}
              order={order}
            />
          ))}
        </ul>
      </Fragment>
    );
}
