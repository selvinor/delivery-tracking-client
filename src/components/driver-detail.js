import React, { Fragment } from 'react';

const DriverDetail = (props) => {
  return (
    <Fragment>
      <div>
        <p className="big bold reverse top">Vehicle: </p>
        <p><span className="bold"> Driver Name</span><br />{props.driver} </p>
        <p><span className="bold"> Phone: </span><br />{props.driver.driverVehicleMake} </p>
        <p><span className="bold"> VehicleMake: </span><br />{props.driver.driverVehicleMake}</p>
        <p><span className="bold"> VehicleModel: </span><br />{props.driver.driverVehicleModel}</p>
        <p><span className="bold"> VehiclePlate: </span><br />{props.driver.driverVehiclePlate}</p>
      </div>
    </Fragment>
  );
};
export default DriverDetail;