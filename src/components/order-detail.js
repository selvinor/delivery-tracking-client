import React, { Fragment } from 'react';
import StatusButton from './status-button';
import TimeAgo from './timeAgo';

const OrderDetail = (props) => {

  const handleStatusClick = props.handleStatusClick;
  const order = props.order;

  let pickupStatus = 'pending';
  let deliveryStatus = 'pending';
  if (order.pickup) {
     pickupStatus = order.pickup.pickupStatus;
  }
  if (order.delivery) {
    deliveryStatus = order.delivery.deliveryStatus;
 }
  let businessName = null;
  if (order.destination.recipient.businessName) {
    businessName = `<br />${order.destination.recipient.businessName}`;
  }
  return (
    <Fragment>
      <li className="order">
        <p className="center">
          <StatusButton handleStatusClick={handleStatusClick} status={order.orderStatus} _id={order._id} /> 
          <br /><span className="bold"> Updated </span> {TimeAgo(order.updatedAt)} 
        </p>      
        <p className="center"><span className="big bold center"> Order</span><br />{order.orderNumber} </p>
        <p className="center">
          <span className="big bold center"> Destination: </span>
          {businessName}
          <br /><span className="bold">
          {order.destination.recipient}        
          </span>
          <br />
            { 
            ' ' + order.destination.streetAddress}
            <br />
            {
            ' ' + order.destination.city  + 
            ', ' + order.destination.state  + 
            ' ' + order.destination.zipcode          
          }
          <br />{order.destination.phone}        
        </p>
        <p className="center"><span className="big bold center"> Order StatusButton: </span><br />{order.orderStatus}<br />{order.updatedAt}  </p>
        <p className="center"><span className="big bold center"> Order Size: </span><br />{order.orderSize}</p>
        <p className="center"><span className="big bold center"> Order Contents: </span><br />{order.orderDescription}</p>
        <p className="center"><span className="big bold center"> Delivery Instructions: </span><br />{order.destination.instructions}</p>
        <p className="center"><span className="big bold center"> Pickup StatusButton: </span><br />{pickupStatus}</p>
        <p className="center"><span className="big bold center"> Delivery StatusButton: </span><br />{deliveryStatus} </p>  
      </li>     
    </Fragment>
  );

};
export default OrderDetail;