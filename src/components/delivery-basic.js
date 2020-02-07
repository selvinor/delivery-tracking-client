import React, { Fragment } from 'react';
const DeliveryBasic = (props) => {
  console.log('DeliveryBasic props: ', props);
  let instructions = null;
  if (props.order.destination.instructions) {
    instructions = `*** ${props.order.destination.instructions} ***`;
  }
   return (
    <Fragment>
      <div className="deliveryDest">
        <p className="big bold reverse"> Destination:</p>
        <p> {props.order.destination.recipient.businessName}</p>
        <p>{props.order.destination.recipient}</p>
        <p>{props.order.destination.streetAddress}</p>
        <p>{props.order.destination.city  +  ', ' + props.order.destination.state + ' ' + props.order.destination.zipcode}</p>
        <p>{props.order.destination.recipient.phone}</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>     
    </Fragment>
  );
};
export default DeliveryBasic;