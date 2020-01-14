import React from 'react';
import Delivery from './delivery';

export default function DeliveryList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Deliverys 
  //    2)  change delivery status from pending to ready and back
  //    3)  delete Delivery from list
  //    4)  select and show Delivery detail   

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
                  delivery={delivery}
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
