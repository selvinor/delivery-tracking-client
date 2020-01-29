import React, { Fragment } from 'react';
import Status from './status';
import TimeAgo from './timeAgo';
const Pickup = (props) => {
  const pickup = props.pickup;
  console.log('pickup: ', pickup);
  const handleStatusClick = props.handleStatusClick;
  return (
    <Fragment>
      <li className="pickup">
      <p>
        <Status handleStatusClick={handleStatusClick} status={props.pickup.pickupStatus} _id={props.pickup._id} /> 
        <br /><span className="bold"> Updated </span> {TimeAgo(pickup.updatedAt)} 
      </p>
      <p></p>  
      <p>
        <span className="big  bold"> Pickup Location: </span>
        <br /><span className="bold">
        {pickup.pickupVendor.vendorName}
        </span><br />
          { 
          ' ' + pickup.pickupVendor.vendorLocation.streetAddress}
          <br />
          {
          ' ' + pickup.pickupVendor.vendorLocation.city  + 
          ', ' + pickup.pickupVendor.vendorLocation.state  + 
          ' ' + pickup.pickupVendor.vendorLocation.zipcode          
        }
        <br />{pickup.pickupVendor.vendorPhone} 
      </p>
      
       
      <p><span className="big  bold"> Number of orders: </span><br /><span className="big  bold">{pickup.pickupVendor.orders.length} </span></p>  
      <p><span className="big  bold"> Destination Depot: </span><br />{ pickup.depot.depotName} </p>
      </li>     
    </Fragment> 
  );
};

export default Pickup;