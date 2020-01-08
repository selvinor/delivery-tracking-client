import React from 'react';
import Driver from './driver-list';

export default function DriverList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Drivers 
  //    2)  change driver status from pending to ready and back
  //    3)  delete Driver from list
  //    4)  select and show Driver detail   

const drivers = props.drivers;
return (
      <div>
        <ul className="driver-list">
          {drivers.map((driver, index) => (
            <Driver
              key={index}
              index={index}
              driver={driver}
            />
          ))}
        </ul>
      </div>
    );
}
