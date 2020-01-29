import React, { Fragment } from 'react';
import Status from './status';
const DeliveryBasic = (props) => {

   return (
    <Fragment>
      <Status component="delivery" handleStatusClick={props.handleStatusClick} updatedAt={props.updatedAt} status={props.deliveryStatus.replace(/_/g, " ")} _id={props._id} />
      <div className="deliveryDest">
        <p className="big  bold"> Destination:</p>
        <p> {props.order.destination.recipient.businessName}</p>
        <p className="bold">{props.order.destination.recipient}</p>
        <p>{props.order.destination.streetAddress}</p>
        <p>{props.order.destination.city  +  ', ' + props.order.destination.state + ' ' + props.order.destination.zipcode}</p>
        <p>{props.order.destination.recipient.recipientPhone}</p>
        <p>{props.order.destination.instructions}</p>
      </div>       
    </Fragment>
  );

};
export default DeliveryBasic;