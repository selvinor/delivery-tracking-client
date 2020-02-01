import React, { Fragment } from 'react';


const Driver = (props) => {
  const driver = props.driver;

  return (
    <Fragment>
      <li className="driver">
      <p><span className="bold"> Driver Name</span><br />{driver.driverName} </p>
      <p><span className="bold"> Phone: </span><br />{ driver.driverPhone} </p>
      <p><span className="bold"> VehicleMake: </span><br />{driver.driverVehicleMake}</p>
      <p><span className="bold"> VehicleModel: </span><br />{driver.driverVehicleModel}</p>  
      <p><span className="bold"> VehiclePlate: </span><br />{driver.driverVehiclePlate}</p>  
      <p><span className="bold"> Driver StatusButton: </span><br />{driver.driverStatus}<br />{driver.updatedAt}  </p>
      {/* <p><span className="bold"> Pickups: </span><br />{driver.pickups} </p>
      <p><span className="bold"> Deliveries: </span><br />{driver.deliveries} </p> */}
    </li>     
    </Fragment>
  );
};

export default Driver;