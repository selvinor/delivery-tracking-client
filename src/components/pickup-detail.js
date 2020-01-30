import React, { Fragment } from 'react';
import Status from './status';
const PickupDetail = (props) => {

   return (
    <Fragment>
      <Status component="pickup" handleStatusClick={props.handleStatusClick} updatedAt={props.updatedAt} status={props.pickupStatus.replace(/_/g, " ")} _id={props._id} />
      <div className="pickupLocation">
        <p className="big  bold"> Pickup Location:</p>
        <p className="bold"> {props.pickupVendor.vendorName}</p>
        <p>{props.pickupVendor.vendorLocation.streetAddress}</p>
        <p>{props.pickupVendor.vendorLocation.city  +  ', ' + props.pickupVendor.vendorLocation.state + ' ' + props.pickupVendor.vendorLocation.zipcode}</p>
        <p>{props.pickupVendor.vendorPhone}</p>
      </div>       
      <div>     
        <p className="big bold center">Number of orders: </p>
        <p>{props.pickupVendor.orders.length}</p>
      </div>    
      <div className="center">
        <p className="big bold center"> Dropoff: </p>
        <p>{props.depot.depotName}</p>
      </div> 
    </Fragment>
  );

};
export default PickupDetail;