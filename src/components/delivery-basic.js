import React, { Fragment } from 'react';
import Status from './status';
import TimeAgo from './timeAgo';
const DeliveryBasic = (props) => {

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
  console.log('delivery-basic.js order: ', order);
  return (
    <Fragment>
     <p>
        <Status activity="delivery" handleStatusClick={props.handleStatusClick} status={props.deliveryStatus} _id={props._id} /> 
        <br /><span className="bold"> Updated </span> {TimeAgo(props.updatedAt)} 
      </p>
       <p>
        <span className="big  bold"> Destination: </span>
        <br />{props.order.destination.recipient.businessName}
        <br /><span className="bold">
        {props.order.destination.recipient}        
        </span>
        <br />
          { 
          ' ' + props.order.destination.streetAddress}
          <br />
          {
          ' ' + props.order.destination.city  + 
          ', ' + props.order.destination.state  + 
          ' ' + props.order.destination.zipcode          
        }
      <br />{props.order.destination.recipient.recipientPhone}
      <br />{props.order.destination.instructions}
      </p>       
      <p><span className="big  bold"> Order: </span><br /><span className="big  bold">{props.order.orderNumber} </span></p>   */}
    </Fragment>
  );

};
export default DeliveryBasic;