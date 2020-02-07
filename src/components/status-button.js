import React from 'react';
import TimeAgo from './timeAgo';

const StatusButton = (props) => {
  console.log('StatusButton props: ', props, 'props.component: ', props.component);
  // const status = (props.deliveryStatus).replace(/_/g, " ");
  let status = props.status;
  let timestamp = props.updated; 
  let order = null; 

  console.log('status-button status: ', status);
  console.log('status-button userType: ', props.userType);
  console.log('status-button component: ', props.component);
  console.log('status-button pickup #1 id: ', props.pickups);
  console.log('status-button delivery #1 id: ', status);
 
  const statusClass = (`${status} Button`).replace(/ /g, "_") + ' component';   

  const updated = `Updated ${TimeAgo(timestamp)}`;
  if (props.order) {
    order = 'Order: ' + props.order.orderNumber;
  }
  if (props.pickups) {
    order = props.numOrders + ' Orders';
  }
  
  console.log('status-button status2: ', status);
  if (props.component === 'driver') {
    return (
      <div className="status-button">
        <button className={statusClass} onClick={() => {props.handleStatusClick(props.userType, props.component, props.status, props.timestamp, props.id)}}>
          <p className="bold small">{props.driverName}</p>
          <p className="bold small">{props.driverPhone}</p>
          <p className="bold small">Vehicle</p>          
          <p className="makeModel">{props.driverVehicleMake} {props.driverVehicleModel}</p>
          <p className="list-index">{props.id}</p>
          <p className="status">{status}</p>
          <p className="updated">{updated}</p>       
        </button>
      </div>     
    );  
  } else {
    return (
      <div className="status-button">
        <button className={statusClass} onClick={() => {props.handleStatusClick(props.userType, props.component, props.status, props.timestamp, props.id)}}>
          <p className="bold small">{props.component.charAt(0).toUpperCase() + props.component.substring(1)}  #{props.index +1}</p>
          <p className="list-index">{props.id}</p>
          <p className="list-index">{order}</p>
          <p className="status">{status}</p>
          <p className="updated">{updated}</p>       
        </button>  
      </div>
    );  
  }
};

export default StatusButton;