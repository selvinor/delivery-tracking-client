import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';
import DeleteOrderButton from './delete-button';

const OrderDetail = (props) => {
  console.log('OrderDetail props: ', props);
  let instructions = null;
  if (props.destination.instructions) {
    instructions = `*** ${props.destination.instructions} ***`;
  }  

  return (
    <Fragment>
      <StatusButton component="order" {...props} index={props.index}  status={props.orderStatus.replace(/_/g, " ")}  />
      <div className="orderDest">
        <p className="big bold"> Destination:</p>
        <p>{props.destination.recipient.businessName}</p>
        <p>{props.destination.recipient}</p>
        <p>{props.destination.streetAddress}</p>
        <p>{props.destination.city  +  ', ' + props.destination.state + ' ' + props.destination.zipcode}</p>
        <p>{props.destination.recipient.recipientPhone}</p>
        <p className="bold orderInstructions">{instructions}</p>
      </div>       
      <div className="orderContents">     
        <p className="big bold">Order Contents: </p>
        <p>{props.orderDescription}</p>
      </div>    
      <div className="orderSize">
        <p className="big bold"> Order Size: </p>
        <p>{props.orderSize}</p>
      </div> 
      <ShowDetailsButton component="order" {...props} />   
      <DeleteOrderButton component="order" {...props} />   
    </Fragment>
  );

};
export default OrderDetail;