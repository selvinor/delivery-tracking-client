import React, { Fragment } from 'react';

const OrderBasic = (props) => {
  console.log('OrderBasic props: ', props);
  let instructions = null;
  let order = null;
  let userName = null;

  if (props.destination.instructions) {
    instructions = `*** ${props.destination.instructions} ***`;
  }
  if (props.orderNumber) {
    order = 'Order Ref: ' + props.orderNumber;
  }
  if (props.pickups) {
    order = props.numOrders + ' Orders';
  }
  if (props.vendor) {
    userName = 'Vendor: ' + props.vendor.name;
  }
  return (
    <Fragment>
      <div className="orderDest reverse">
        <div className="orderOrigin ">
          <p className="bold small">{props.component.charAt(0).toUpperCase() + props.component.substring(1)}  #{props.index + 1}</p>
          <p className="list-index">{userName}</p>
          <p className="list-index">{order}</p>
        </div>
        <p>{props.destination.recipient}</p>
        <p>{props.destination.businessName}</p>
        <p>{props.destination.streetAddress}</p>
        <p>{props.destination.city}</p>
        <p className="bold deliveryInstructions">{instructions}</p>
      </div>
    </Fragment>
  );

};
export default OrderBasic;