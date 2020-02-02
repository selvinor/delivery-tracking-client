import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';

const DriverDetail = (props) => {
  return (
    <Fragment>
      <StatusButton component="delivery" {...props} status={props.deliveryStatus.replace(/_/g, " ")} />
      <div>
        <p className="big bold reverse top">Vehicle: </p>
        <p><span className="bold"> Driver Name</span><br />{props.driver} </p>
        <p><span className="bold"> Phone: </span><br />{props.driver.driverVehicleMake} </p>
        <p><span className="bold"> VehicleMake: </span><br />{props.driver.driverVehicleMake}</p>
        <p><span className="bold"> VehicleModel: </span><br />{props.driver.driverVehicleModel}</p>
        <p><span className="bold"> VehiclePlate: </span><br />{props.driver.driverVehiclePlate}</p>
      </div>
      <div>
      <p className="big bold reverse top">Pickups: </p>
        <p><span className="bold"> Pickups: </span><br />{props.driver.pickups} </p>
      </div>
      <div>
      <p className="big bold reverse top">Deliveries: </p>
        <p><span className="bold"> Deliveries: </span><br />{props.driver.deliveries} </p>
      </div>
      <ShowDetailsButton component="delivery" {...props} /> 
    </Fragment>
  );
};
export default DriverDetail;