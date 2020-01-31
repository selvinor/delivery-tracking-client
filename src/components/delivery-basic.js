import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';
const DeliveryBasic = (props) => {
  console.log('DeliveryBasic props: ', props);
  let instructions = props.order.destination.instructions;
  if (props.order.destination.instructions.length > 0) {
    instructions = `*** ${props.order.destination.instructions} ***`;
  }
   return (
    <Fragment>
      <StatusButton component="delivery" {...props}  status={props.deliveryStatus.replace(/_/g, " ")}  />
      <div className="deliveryDest">
        <p className="big  bold"> Destination:</p>
        <p> {props.order.destination.recipient.businessName}</p>
        <p>{props.order.destination.recipient}</p>
        <p>{props.order.destination.streetAddress}</p>
        <p>{props.order.destination.city  +  ', ' + props.order.destination.state + ' ' + props.order.destination.zipcode}</p>
        <p>{props.order.destination.recipient.recipientPhone}</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>     
      <ShowDetailsButton component="delivery" {...props} />   
    </Fragment>
  );
};
export default DeliveryBasic;