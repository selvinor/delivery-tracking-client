import React from 'react';
import TimeAgo from './timeAgo';

const StatusButton = (props) => {
  console.log('StatusButton props: ', props, 'props.component: ', props.component);
  // const status = (props.deliveryStatus).replace(/_/g, " ");
  let status = props.status;
  let timestamp = props.updated; 
  let order = null; 

  console.log('status-button status: ', status);
  const statusClass = (`${status} Button`).replace(/ /g, "_") + ' component';   

  const updated = `Updated ${TimeAgo(timestamp)}`;
  if (props.order) {
    order = 'Order: ' + props.order.orderNumber;
  }
  if (props.pickups) {
    order = props.numOrders + ' Orders';
  }
  console.log('status-button status2: ', status);
  return (
    <div className="status-button">
      <button className={statusClass} onClick={() => {props.handleStatusClick(props.userType, props.component, props.status, props.id)}}>
        <p className="bold small">{props.component.charAt(0).toUpperCase() + props.component.substring(1)}  #{props.index +1}</p>
        <p className="list-index">{order}</p>
        <p className="status">{status}</p>
        <p className="updated">{updated}</p>       
      </button>
    </div>     
  );
};

export default StatusButton;