import React from 'react';
import Delivery from './delivery';

export default function DeliveryList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Deliveries 
  //    2)  change delivery status
  //    3)  select and show Delivery detail   
//console.log('delivery-list props: ', props);
  const deliveries = props.deliveries;
  if (deliveries) {
    if (deliveries.length >= 1) {
      return (
        <div>
          <h3>Deliveries</h3>
          <ul className="delivery-list">
            {deliveries.map((delivery, index) => (
              <Delivery
              key={index}
              index={index}
              {...delivery}
              id={delivery.id}
              userType={props.userType}
              component="pickup"  
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
