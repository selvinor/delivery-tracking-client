import React, { Fragment } from 'react';


const Pickup = (props) => {
  const pickup = props.pickup;
console.log('pickup: ', pickup);
  return (
    <Fragment>
      <li className="pickup">
      <p><span className="bold"> Pickup Status: </span><br />{pickup.pickupStatus}<br />{pickup.updatedAt}  </p>
      <p><span className="bold"> Pickup Location: </span><br />{pickup.pickupVendor.vendorName + ' ' + pickup.pickupVendor.vendorLocation.streetAddress + ' ' + pickup.pickupVendor.vendorLocation.city  + ', ' + pickup.pickupVendor.vendorLocation.state  + ' ' + pickup.pickupVendor.vendorLocation.zipcode } </p>  
      <p><span className="bold"> Phone: </span><br />{pickup.pickupVendor.vendorPhone} </p>
      <p><span className="bold"> Number of items: </span><br />{pickup.pickupVendor.orders.length} </p>  
      <p><span className="bold"> Destination Depot: </span><br />{ pickup.depot.depotName} </p>
      </li>     
    </Fragment> 
  );
};

export default Pickup;