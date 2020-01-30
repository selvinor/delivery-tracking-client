import React, { Fragment } from 'react';
import ShowDetails from './show-details';
import PickupBasic from './pickup-basic';
import PickupDetail from './pickup-detail';

const Pickup = (props) => {
  console.log('pickup2 props: ', props);
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  if (showDetails) {
    return (
      <Fragment>
        <li className="pickup">
          <ShowDetails component="pickup" updatedAt={props.updatedAt} handleDetailsClick={props.handleDetailsClick} index={props.index} id={props._id} orderCount={props.pickupVendor.orders.length} /> 
          <PickupDetail component="pickup" {...props}  />
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="pickup">
        <ShowDetails component="pickup" updatedAt={props.updatedAt} handleDetailsClick={props.handleDetailsClick} index={props.index} id={props._id} orderCount={props.pickupVendor.orders.length} /> 
        <PickupBasic component="pickup" {...props}  />
      </li>     
    </Fragment> 
  );
};

export default Pickup;