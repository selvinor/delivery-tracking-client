import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';

const PickupDetail = (props) => {
  const orderList = props.pickupVendor.orders.map(order => {
    return <p>{order.orderNumber}</p>
  });

   return (
    <Fragment>
      <StatusButton component="pickup" numOrders={props.pickupVendor.orders.length} index={props.index}  {...props} status={props.pickupStatus.replace(/_/g, " ")} />
      <div className="pickupLocation center">
        <p className="big reverse bold"> Pickup Location:</p>
        <p>{props.pickupVendor.businessName}</p>
        <p>{props.pickupVendor.vendorName}</p>
        <p>{props.pickupVendor.vendorLocation.streetAddress}</p>
        <p>{props.pickupVendor.vendorLocation.city  +  ', ' + props.pickupVendor.vendorLocation.state + ' ' + props.pickupVendor.vendorLocation.zipcode}</p>
        <p>{props.pickupVendor.vendorPhone}</p>
      </div>       
      <div>     
        <p className="big bold reverse top">Number of orders: </p>
        <p className="center">{props.pickupVendor.orders.length}</p>
      </div>
      <div className="small-list center">
        <p className="big bold reverse top">Orders: </p>
        <p>{orderList}</p>
      </div>    
      <ShowDetailsButton component="pickup" {...props} /> 
    </Fragment>
  );

};
export default PickupDetail;