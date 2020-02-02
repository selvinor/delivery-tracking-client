import React, { Fragment } from 'react';
import PickupBasic from './pickup-basic';
import PickupDetail from './pickup-detail';

const Pickup = (props) => {
  console.log('pickup props: ', props);
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="dashboard">
          <PickupDetail component="pickup" {...props}  detailsButtonText={detailsButtonText} />
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="dashboard">
        <PickupBasic component="pickup" {...props}  detailsButtonText={detailsButtonText} />
      </li>     
    </Fragment> 
  );
};

export default Pickup;