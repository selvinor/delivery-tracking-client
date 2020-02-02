import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';
const PickupBasic = (props) => {
  console.log('PickupBasic props: ', props);
   return (
    <Fragment>
      <StatusButton component="pickup" numOrders={props.pickupVendor.orders.length} index={props.index}  {...props}  status={props.pickupStatus.replace(/_/g, " ")} />
      <div className="pickupLocation center">
        <p className="big bold reverse"> Pickup Location:</p>
        <p className="bold"> {props.pickupVendor.vendorName}</p>
        <p>{props.pickupVendor.vendorLocation.streetAddress}</p>
        <p>{props.pickupVendor.vendorLocation.city  +  ', ' + props.pickupVendor.vendorLocation.state + ' ' + props.pickupVendor.vendorLocation.zipcode}</p>
        <p>{props.pickupVendor.vendorPhone}</p>
      </div>       
      <div className="center">     
        <p className="big bold reverse top">Number of orders: </p>
        <p>{props.pickupVendor.orders.length}</p>
      </div>    
      <ShowDetailsButton component="pickup" {...props} /> 
    </Fragment>
  );

};
export default PickupBasic;