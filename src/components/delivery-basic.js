import React, { Fragment } from 'react';
const DeliveryBasic = (props) => {
  console.log('DeliveryBasic props: ', props);
  let instructions = null;
  if (props.delivery.order.destination.instructions) {
    instructions = `*** ${props.delivery.order.destination.instructions} ***`;
  }
   return (
    <Fragment>
      <div className="deliveryDest">
        <p className="big bold reverse"> Destination:</p>
        <p> {props.delivery.order.destination.recipient.businessName}</p>
        <p>{props.delivery.order.destination.recipient}</p>
        <p>{props.delivery.order.destination.streetAddress}</p>
        <p>{props.delivery.order.destination.city  +  ', ' + props.delivery.order.destination.state + ' ' + props.delivery.order.destination.zipcode}</p>
        <p>{props.delivery.order.destination.recipient.phone}</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>     
    </Fragment>
  );
};
export default DeliveryBasic;