import React, { Fragment } from 'react';
import Status from './status';
import TimeAgo from './timeAgo';
const Order = (props) => {

  const handleClick = props.handleClick;
  const order = props.order;
  const index = props.index;
  console.log('order.js order: ', order);
  return (
    <Fragment>
      <li className="order">
      <h3>#{index + 1}</h3> 
      <p><span className="bold"> Order</span><br />{order.orderNumber} </p>
      <p>
        <Status handleClick={handleClick} status={props.order.orderStatus} _id={props.order._id} /> 
        <br /><span className="bold"> Updated </span> {TimeAgo(order.updatedAt)} 
      </p>      <p><span className="bold"> Recipient: </span><br />{ order.destination.recipient} </p>
      <p><span className="bold"> Order Status: </span><br />{order.orderStatus}<br />{order.updatedAt}  </p>
      <p><span className="bold"> Pickup Status: </span><br />{order.pickup.pickupStatus}<br />{order.pickup.updatedAt}  </p>
      <p><span className="bold"> Delivery Status: </span><br />{order.delivery.deliveryStatus}<br />{order.delivery.updatedAt} </p>  
      </li>     
    </Fragment>
  );

};
export default Order;