import React, { Fragment } from 'react';
import DriverBasic from './driver-basic';
import DriverDetail from './driver-detail';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';

const Driver = (props) => {
  console.log('Driver.js props: ', props);
  let  status = props.driverStatus[props.driverStatus.length-1];
  console.log('typeof(status): ', typeof(status));
  console.log('Driver.js status: ', status);
  status= status.status.replace(/_/g, " ");
  console.log('Driver.js status after: ', status);
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="dashboard">
        <StatusButton 
            id={props._id}
            userType={props.userType}
            component="driver" 
            handleStatusClick={props.handleStatusClick} 
            updated={props.driverStatus[props.driverStatus.length - 1].timestamp} 
            status={props.driverStatus[props.driverStatus.length - 1].status} 
            timestamp={props.driverStatus[props.driverStatus.length - 1].timestamp} 
            index={props.index} 
          />
          <DriverDetail component="driver" {...props} detailsButtonText={detailsButtonText} />
          <ShowDetailsButton component="driver" {...props} />
        </li>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <li className="dashboard">
        <StatusButton 
          id={props._id}
          userType={props.userType}
          component="driver" 
          handleStatusClick={props.handleStatusClick} 
          updated={props.driverStatus[props.driverStatus.length - 1].timestamp} 
          status={props.driverStatus[props.driverStatus.length - 1].status} 
          timestamp={props.driverStatus[props.driverStatus.length - 1].timestamp} 
          index={props.index} 
          {...props}
        />
        <DriverBasic component="driver" {...props} detailsButtonText={detailsButtonText} />
        <ShowDetailsButton component="driver" {...props} />
        </li>
      </Fragment>
    );
  }
};

export default Driver;