import React from 'react';
const Status = (props) => {
  console.log('status props: ', props);
  const statusClass = `${props.status} Button`;   
  return (
    <button className={statusClass} onClick={() => { props.handleStatusClick(props.activity, props.status, props._id)}}>
      {props.status.replace(/_/g, " ")}
    </button>
  );
};

export default Status;