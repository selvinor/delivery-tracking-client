import React from 'react';
import Driver from './driver';
import PickupList from './pickup-list';
import DeliveryList from './delivery-list';

export default function DriverList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Drivers 
  //    2)  change driver status from pending to ready and back
  //    3)  delete Driver from list
  //    4)  select and show Driver detail   

const drivers = props.drivers;
return (
      <div>
        <h3>Drivers</h3>
        <ul className="driver-list">
          {drivers.map((driver, index) => (
          <li>
            <Driver
              key={index}
              index={index}
              {...driver}
              {...props}
            />
            <PickupList className="pickupList"
              {...driver} 
              {...props}

              // handleStatusClick={props.handleStatusClick} 
              // handleDetailsClick={props.handleDetailsClick} 
              // showDetails={props.showDetails}
            />
            <DeliveryList 
              {...driver}
              {...props} 
              // handleStatusClick={props.handleStatusClick} 
              // handleDetailsClick={props.handleDetailsClick} 
              // showDetails={props.showDetails}
            />
          </li>
          ))}
        </ul>
      </div>
    );
}
