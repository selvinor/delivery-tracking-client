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
      <div className="orderDest reverse">
        <p className="big  bold">Destination:</p>
        <p>{props.destination.recipient}</p>
        <p>{props.destination.businessName}</p>
        <p>{props.destination.streetAddress}</p>
        <p>{props.destination.city }</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>       
      <div className= "orderButtons">
        <p><ShowDetailsButton component="order" {...props} /></p>  
        <p><DeleteOrderButton component="order" {...props} /></p>     
      </div>
    </Fragment>
  );

};
export default OrderBasic;