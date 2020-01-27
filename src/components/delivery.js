import React, { Fragment } from 'react';
import Status from './status';
import TimeAgo from './timeAgo';
const Delivery = (props) => {
  const delivery = props.delivery;
  console.log('delivery: ', delivery);
  const handleClick = props.handleClick;
  return (
    <Fragment>
      <li className="delivery">
      <p>
        <Status handleClick={handleClick} status={props.delivery.deliveryStatus} _id={props.delivery._id} /> 
        <br /><span className="bold"> Updated </span> {TimeAgo(delivery.updatedAt)} 
      </p>
      <p>
        <span className="big  bold"> Destination: </span>
        <br />{delivery.order.destination.recipient.businessName}
        <br /><span className="bold">
        {delivery.order.destination.recipient}        
        </span>
        <br />
          { 
          ' ' + delivery.order.destination.streetAddress}
          <br />
          {
          ' ' + delivery.order.destination.city  + 
          ', ' + delivery.order.destination.state  + 
          ' ' + delivery.order.destination.zipcode          
        }
      <br />{delivery.order.destination.recipient.recipientPhone}
      <br />{delivery.order.destination.instructions}
      </p>
      
       
      <p><span className="big  bold"> Order: </span><br /><span className="big  bold">{delivery.order.orderNumber} </span></p>  
      </li>     
    </Fragment> 
  );
};

export default Delivery;