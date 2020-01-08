import React, { Fragment } from 'react';


const Delivery = (props) => {
  const delivery = props.delivery;

  return (
    <Fragment>
      <li className="delivery">
      <p><span className="bold"> Date</span><br />{delivery.deliveryDate} </p>
      <p><span className="bold"> Depot: </span><br />{ delivery.depot} </p>
      <p><span className="bold"> Delivery Status: </span><br />{delivery.deliveryStatus}<br />{delivery.updatedAt}  </p>
      <p><span className="bold"> Order: </span><br />{delivery.order}<br />{delivery.order} </p>  
      <p><span className="bold"> Zone: </span><br />{delivery.zone}<br />{delivery.zone} </p>  
      <p><span className="bold"> Delivery # items: </span><br />{delivery.orders.length} </p>  
      </li>     
    </Fragment>
  );
};

export default Delivery;