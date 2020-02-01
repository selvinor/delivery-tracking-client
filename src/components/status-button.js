import React from 'react';
import TimeAgo from './timeAgo';

const StatusButton = (props) => {
  console.log('StatusButton props: ', props);
  // const status = (props.deliveryStatus).replace(/_/g, " ");
  const status = props.status;
  const statusClass = (`${status} Button`).replace(/ /g, "_") + ' component';   
  // console.log('status statusClass: ', statusClass);
  let order = null;
  const updated = `Updated ${TimeAgo(props.updatedAt)}`;
  if (props.order) {
    order = 'Order: ' + props.order.orderNumber;
  }
  if (props.pickups) {
    order = props.numOrders + ' Orders';
  }
  return (
    <div className="status-button">
      <button className={statusClass} onClick={() => { props.handleStatusClick(props.userType, props.component, props.status, props._id)}}>
        <p className="bold small">{props.component.charAt(0).toUpperCase() + props.component.substring(1)}  #{props.index +1}</p>
        <p className="list-index">{order}</p>
        <p className="status">{status}</p>
        <p className="updated">{updated}</p>       
      </button>
    </div>     
  );
};

export default StatusButton;