import React from 'react';
import TimeAgo from './timeAgo';

const Status = (props) => {
  const statusClass = `${props.status} Button`;   
  return (
    <div className="status-button">
      <button className={statusClass.replace(/ /g, "_")} onClick={() => { props.handleStatusClick(props.component, props.status, props._id)}}>
        {props.status}
        {/* {props.status.replace(/_/g, " ")} */}
      </button>
      <p><span className="bold"> Updated </span> {TimeAgo(props.updatedAt)}</p>       
    </div>     
  );
};

export default Status;