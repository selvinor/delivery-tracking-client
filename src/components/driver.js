import React, { Fragment } from 'react';


const Driver = (props) => {
  const driver = props.driver;

  return (
    <Fragment>
      <li className="driver">
      <p><span className="bold"> Driver Name</span><br />{driver.driverName} </p>
      <p><span className="bold"> Phone: </span><br />{ driver.driverPhone} </p>
      <p><span className="bold"> VehicleMake: </span><br />{driver.driverVehicleMake}</p>
      <p><span className="bold"> VehiclePlate: </span><br />{driver.driverVehiclePlate}</p>  
      <p><span className="bold"> Driver Status: </span><br />{driver.driverStatus}<br />{driver.updatedAt}  </p>
      <p><span className="bold"> Pickups: </span><br />{driver.pickups}<br />{driver.updatedAt}  </p>
      <p><span className="bold"> Deliveries: </span><br />{driver.deliveries}<br />{driver.updatedAt}  </p>
    </li>     
    </Fragment>
  );
};

export default Driver;