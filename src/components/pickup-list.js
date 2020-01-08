import React from 'react';
import Pickup from './pickup';

export default function PickupList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Pickups 
  //    2)  change pickup status from pending to ready and back
  //    3)  delete Pickup from list
  //    4)  select and show Pickup detail   

  const pickups = props.pickups;
  if (pickups) {
    if (pickups.length >= 1) {
      return (
        <div>
          <ul className="pickup-list">
            {pickups.map((pickup, index) => (
              <Pickup
                key={index}
                index={index}
                pickup={pickup}
              />
            ))}
          </ul>
        </div>
      );
  
    } else {
      return '';
    } 
  } else {
    return '';
  }
}
