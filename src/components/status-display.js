import React, { Fragment } from 'react';
import TimeAgo from './timeAgo';

const StatusDisplay = (props) => {
  console.log('StatusDisplay props: ', props);
  // const status = (props.deliveryStatus).replace(/_/g, " ");
  let currentStatus = props.orderStatus[props.orderStatus.length - 1].status;
  // console.log('props.orderStatus["status"]["picked_up"]: ', props.orderStatus["status"]["picked_up"]);
  // Find each status level attained and timestamp
  const statusObj = {
    status_0  : 'completed',
    updated_0 :  null,
    status_1  : 'pending',
    updated_1 :  null,
    status_2  : 'pending',
    updated_2 :  null,
    status_3  : 'pending',
    updated_3 :  null,
    status_4  : 'pending',
    updated_4 :  null,
    status_5  : 'pending',
    updated_5 :  null,
    status_6  : 'pending',
    updated_6 :  null,
    status_7  : 'pending',
    updated_7 :  null 
  }
  let statuses = {
    'new': {'status': 'completed', 'timestamp': null},
    'ready_for_pickup':  {'status': 'pending', 'timestamp': null},
    'picked_up': {'status': 'pending', 'timestamp': null},
    'dropped_off': {'status': 'pending', 'timestamp': null},
    'dispatched': {'status': 'pending', 'timestamp': null},
    'out_for_delivery': {'status': 'pending', 'timestamp': null},
    'delivered': {'status': 'pending', 'timestamp': null},
    'undeliverable': {'status': 'pending', 'timestamp': null}
  };
  const orderStatus = props.orderStatus;
  orderStatus.forEach((orderStatus, index) => {
    console.log('index:', index, '  orderStatus.status:', orderStatus.status, ' | timestamp: ', orderStatus.timestamp);
    statuses[orderStatus.status].status = 'completed';
    statuses[orderStatus.status].timestamp = orderStatus.timestamp;
  })

  console.log('statuses:', statuses);

  let timestamp = props.updated;
  //set background color of all statuses less than or equal to current status
  console.log('status-display props: ', props); 

  // const statusClass = (`${currentStatus} Button`).replace(/ /g, "_") + ' component';
  //let updated = props.orderStatus[props.orderStatus.length - 1].timestamp;




  //console.log('status-button status2: ', status);
  let myStatuses = Object.entries(statuses);   //create key, value pairs
  console.log('myStatuses: ', myStatuses);
  let myClass;
  let fragment1 = myStatuses.map((key, index) => {
    if (index < 4) {
      myClass = `status_${index}`;
      console.log('*** StatusDisplay key', index, ': ', key);
      let myStatus = key[0].replace(/_/g, " ");
      myStatus = myStatus.charAt(0).toUpperCase() + myStatus.substring(1);
      console.log('*** myStatus', myStatus);
      let updated = `Updated ${TimeAgo(key[1].timestamp)}`;
     return (

        <div className="status-button">
          <button className={key[1].status} onClick={() => { console.log('+++CLICKED+++');props.handleStatusClick(props.userType, props.component, key[0], key[1].timestamp, props.id) }}>
            <p className="status">{myStatus}</p>
            <p className="updated">{updated}</p>
          </button>
        </div>

      );
    }
  });

  let fragment2 = myStatuses.map((key, index) => {
    if (index >= 4) {
      myClass = `status_${index}`;
      console.log('*** StatusDisplay key', index, ': ', key);
      let myStatus = key[0].replace(/_/g, " ");
      myStatus = myStatus.charAt(0).toUpperCase() + myStatus.substring(1);
      return (

        <div className="status-button">
          <button className={key[1].status} onClick={() => { props.handleStatusClick(props.userType, props.component, props.orderStatus, props.timestamp, props.id) }}>
            <p className="status">{myStatus}</p>
            <p className="updated"></p>
          </button>
        </div>

      );
    }
  });

  return (
    <Fragment>
      <div className="column">
        <div className="row">
          {fragment1}
        </div>
        <div className="row">
          {fragment2}
        </div>
      </div>
    </Fragment>

  );

};

export default StatusDisplay;