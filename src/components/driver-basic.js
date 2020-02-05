import React, { Fragment } from 'react';
import PickupList from './pickup-list'
import DeliveryList from './delivery-list'

const DriverBasic = (props) => {
  console.log('DriverBasic props',props);
    return (
      <Fragment>
        <div>
          <p className="big bold reverse top center">Vehicle</p>
          <p className="makeModel">{props.driverVehicleMake} {props.driverVehicleModel}</p>
          <p className="bold detail">Vehicle Plate: {props.driverVehiclePlate}</p>

        </div>
        <div>
        <p className="big bold reverse top center">Driver</p>
        <p>{props.driverName}<br />{props.driverPhone}  </p>

        </div>
        <div>
        <p className="big bold reverse top center">Pickups</p>
          <PickupList {...props} />
        </div>
        <div>
        <p className="big bold reverse top center">Deliveries</p>
          <DeliveryList {...props} />
        </div>

      </Fragment>
    );
  };
export default DriverBasic;