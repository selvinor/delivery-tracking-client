import React, { Fragment } from 'react';
import PickupBasic from './pickup-basic';
import PickupDetail from './pickup-detail';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';

const Pickup = (props) => {
  // console.log('pickup props: ', props);
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="dashboard">
          <StatusButton 
            id={props.id}
            userType={props.userType}
            component="pickup"  
            handleStatusClick={props.handleStatusClick} 
            updated={props.pickupStatus[props.pickupStatus.length - 1].timestamp} 
            status={props.pickupStatus[props.pickupStatus.length - 1].status} 
            timestamp={props.pickupStatus[props.pickupStatus.length - 1].timestamp} 
            numOrders={props.pickupVendor.orders.length} 
            index={props.index} />
          <PickupDetail 
            component="pickup" {...props}  
          />
          <ShowDetailsButton component="pickup" detailsButtonText={detailsButtonText} {...props} /> 
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="dashboard">
      <StatusButton 
            id={props._id}
            userType={props.userType}
            component="pickup"  
            handleStatusClick={props.handleStatusClick} 
            updated={props.pickupStatus[props.pickupStatus.length - 1].timestamp} 
            status={props.pickupStatus[props.pickupStatus.length - 1].status} 
            timestamp={props.pickupStatus[props.pickupStatus.length - 1].timestamp} 
            numOrders={props.pickupVendor.orders.length} 
            index={props.index} />
        <PickupBasic component="pickup" {...props}  detailsButtonText={detailsButtonText} />
        <ShowDetailsButton component="pickup" detailsButtonText={detailsButtonText} {...props} /> 
      </li>     
    </Fragment> 
  );
};

export default Pickup;