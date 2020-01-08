import React, { Fragment } from 'react';


const Order = (props) => {
  const order = props.order;

  return (
    <Fragment>
      <li className="order">
      <p><span className="bold"> Order</span><br />{order.orderNumber} </p>
      <p><span className="bold"> Recipient: </span><br />{ order.destination.recipient} </p>
      <p><span className="bold"> Order Status: </span><br />{order.orderStatus}<br />{order.updatedAt}  </p>
      <p><span className="bold"> Pickup Status: </span><br />{order.pickup.pickupStatus}<br />{order.pickup.updatedAt}  </p>
      <p><span className="bold"> Delivery Status: </span><br />{order.delivery.deliveryStatus}<br />{order.delivery.updatedAt} </p>  
      </li>     
    </Fragment>
  );
};

export default Order;