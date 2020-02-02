import React, { Fragment } from 'react';
import DriverBasic from './driver-basic';
import DriverDetail from './driver-detail';

const Driver = (props) => {
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="dashboard">
          <DriverDetail component="driver" {...props}  detailsButtonText={detailsButtonText}  />
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="dashboard">
        <DriverBasic component="driver" {...props} detailsButtonText={detailsButtonText} />
      </li>     
    </Fragment> 
  );
};

export default Driver;