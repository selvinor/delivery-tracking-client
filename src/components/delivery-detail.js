import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';

const DeliveryDetail = (props) => {
  let instructions = props.order.destination.instructions;
  if (props.order.destination.instructions.length > 0) {
    instructions = `*** ${props.order.destination.instructions} ***`;
  }
   return (
    <Fragment>
      <StatusButton component="delivery" {...props}  status={props.deliveryStatus.replace(/_/g, " ")} />
      <div className="deliveryDest">
        <p className="big reverse">Destination:</p>
        <p className="bold" > {props.order.destination.businessName}</p>
        <p className="bold" >{props.order.destination.recipient}</p>
        <p>{props.order.destination.streetAddress}</p>
        <p>{props.order.destination.city  +  ', ' + props.order.destination.state + ' ' + props.order.destination.zipcode}</p>
        <p>{props.order.destination.phone}</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>       
      <div>     
        <p className="big bold reverse top">Contents: </p>
        <p className="center">{props.order.orderDescription}</p>
      </div>    
      <div>
        <p className="big bold reverse top"> Order Size: </p>
        <p className="center">{props.order.orderSize}</p>
      </div> 
      <ShowDetailsButton component="delivery" {...props} /> 
    </Fragment>
  );

};
export default DeliveryDetail;