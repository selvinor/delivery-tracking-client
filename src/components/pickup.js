import React, { Fragment } from 'react';
import Status from './status';

const Pickup = (props) => {
  const pickup = props.pickup;
  console.log('pickup: ', pickup);
  const handleClick = props.handleClick;
  return (
    <Fragment>
      <li className="pickup">
      <p>
        <Status handleClick={handleClick} status={props.pickup.pickupStatus} _id={props.pickup._id} /> 
        <br /><span className="big  bold"> Updated at:</span> {pickup.updatedAt} 
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
      
       
      <p><span className="big  bold"> Number of items: </span><br />{pickup.pickupVendor.orders.length} </p>  
      <p><span className="big  bold"> Destination Depot: </span><br />{ pickup.depot.depotName} </p>
      </li>     
    </Fragment> 
  );
};

export default Pickup;