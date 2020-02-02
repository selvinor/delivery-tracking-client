import React, { Fragment } from 'react';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';
import PickupList from './pickup-list'
import DeliveryList from './delivery-list'

const DriverBasic = (props) => {
  console.log('DriverBasic props',props);
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
    return (
      <Fragment>
        <StatusButton component="driver" {...props} status={props.driverStatus.replace(/_/g, " ")} />
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
        <ShowDetailsButton component="delivery" {...props} />   

      </Fragment>
    );
  };
export default DriverBasic;