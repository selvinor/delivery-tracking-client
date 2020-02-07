import React from 'react';
import Pickup from './pickup';

export default function PickupList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Pickups 
  //    2)  change pickup status from pending to ready and back
  //    3)  delete Pickup from list
  //    4)  select and show Pickup detail   
  //console.log('pickup-list props: ', props);
  const pickups = props.pickups;

  if (pickups) {
    if (pickups.length >= 1) {
      return (
        <div>
          <h3>Pickups</h3>
          <ul className="pickup-list">
            {pickups.map((pickup, index) => (
              <Pickup
                key={index}
                index={index}
                id={pickup._id}
                userType={props.userType}
                component="pickup"  
                {...pickup}
                handleStatusClick={props.handleStatusClick}
                handleDetailsClick={props.handleDetailsClick}
                showDetails={props.showDetails}
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
