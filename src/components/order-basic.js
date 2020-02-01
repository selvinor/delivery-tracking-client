import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';
import DeleteOrderButton from './delete-button';

const OrderBasic = (props) => {
  console.log('OrderBasic props: ', props);
  let instructions = null;
  if (props.destination.instructions) {
    instructions = `*** ${props.destination.instructions} ***`;
  }  
  return (
    <Fragment>
      <StatusButton component="delivery" {...props}  index={props.index}  status={props.orderStatus.replace(/_/g, " ")}  />
      <div className="orderDest">
        <p className="big  bold"> Destination:</p>
        <p>{props.destination.recipient.businessName}</p>
        <p>{props.destination.recipient}</p>
        <p>{props.destination.streetAddress}</p>
        <p>{props.destination.city  +  ', ' + props.destination.state + ' ' + props.destination.zipcode}</p>
        <p>{props.destination.recipient.recipientPhone}</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>       
      <ShowDetailsButton component="order" {...props} />   
      <DeleteOrderButton component="order" {...props} />   
    </Fragment>
  );

};
export default OrderBasic;