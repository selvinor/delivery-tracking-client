import React, { Fragment } from 'react';


const Pickup = (props) => {
  const pickup = props.pickup;
console.log('pickup.pickupVendor: ', pickup.pickupVendor);
  return (
    <Fragment>
      <li className="pickup">
      <p><span className="bold"> Date</span><br />{pickup.pickupDate} </p>
      <p><span className="bold"> Depot: </span><br />{ pickup.depot} </p>
      <p><span className="bold"> Pickup Time Slot: </span><br />{pickup.pickupTimeSlot}</p>
      <p><span className="bold"> Pickup Status: </span><br />{pickup.pickupStatus}<br />{pickup.updatedAt}  </p>
      <p><span className="bold"> Pickup Vendor Name: </span><br />{pickup.pickupVendor.vendorName} </p>  
      <p><span className="bold"> Pickup Vendor Phone: </span><br />{pickup.pickupVendor.vendorPhone} </p>  
      <p><span className="bold"> Pickup Vendor Name: </span><br />{pickup.pickupVendor.vendorName} </p>  
      <p><span className="bold"> Pickup Location: </span><br />{pickup.pickupVendor.vendorLocation.streetAddress + ' ' + pickup.pickupVendor.vendorLocation.city  + ', ' + pickup.pickupVendor.vendorLocation.state  + ' ' + pickup.pickupVendor.vendorLocation.zipcode } </p>  
      <p><span className="bold"> Pickup # items: </span><br />{pickup.pickupVendor.orders.length} </p>  
      </li>     
    </Fragment>
  );
};

export default Pickup;