import React from 'react';

const StatusButton = (props) => {

  // console.log('status-button props: ', props);

  return (
    <div className="status-button" key={props.index}>
      <button className={props.status} onClick={props.onClick}>
        <p className="status">{props.displayStatus}</p>
        <p className="updated">{props.updated}</p>
      </button>
    </div>
  ); 
}
export default StatusButton;