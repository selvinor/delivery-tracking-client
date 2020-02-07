import React, { Fragment } from 'react';

const OrderBasic = (props) => {
  //console.log('OrderBasic props: ', props);
  let instructions = null;
  if (props.destination.instructions) {
    instructions = `*** ${props.destination.instructions} ***`;
  }  
  return (
    <Fragment>
      <div className="orderDest">
        <p className="big reverse top center bold">Destination:</p>
        <p>{props.destination.recipient}</p>
        <p>{props.destination.businessName}</p>
        <p>{props.destination.streetAddress}</p>
        <p>{props.destination.city }</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>       
      <div className= "orderButtons">
      </div>
    </Fragment>
  );

};
export default OrderBasic;