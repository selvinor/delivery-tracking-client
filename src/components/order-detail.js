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
        <p className="big bold reverse">Destination:</p>
        <p>{props.destination.recipient}</p>
        <p>{props.destination.businessName}</p>
        <p>{props.destination.streetAddress}</p>
        <p>{props.destination.city  +  ', ' + props.destination.state + ' ' + props.destination.zipcode}</p>
        <p>{props.destination.phone}</p>
        <p className="bold orderInstructions">{instructions}</p>
      </div>       
      <div className="orderContents">     
        <p className="big bold reverse">Contents:</p>
        <p>{props.orderDescription}</p>
      </div>    
      <div className="orderSize">
        <p className="big bold reverse">Order Size:</p>
        <p>{props.orderSize}</p>
      </div> 
      <div className= "orderButtons">
        <p><ShowDetailsButton component="order" {...props} /></p>  
        <p><DeleteOrderButton component="order" {...props} /></p>   
      </div>
    </Fragment>
  );

};
export default OrderDetail;