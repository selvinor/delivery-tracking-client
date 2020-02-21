import React, { Fragment } from 'react';
import TimeAgo from './timeAgo';

const StatusDisplay = (props) => {
  console.log('StatusDisplay props: ', props);
  // Find each status level attained and timestamp
  const orderStatus = props.orderStatus;
  console.log('***orderStatus : ', orderStatus);
  let new_order = null;
  let ready_for_pickup = null;
  let picked_up = null;
  let dropped_off = null;
  let dispatched = null;
  let out_for_delivery = null;
  let delivered = null;
  let undeliverable = null;

  new_order = orderStatus.slice().reverse().find(status => status.status === 'new_order') ? orderStatus.slice().reverse().find(status => status.status === 'new_order') : null;
  ready_for_pickup = orderStatus.slice().reverse().find(status => status.status === 'ready_for_pickup') ? orderStatus.slice().reverse().find(status => status.status === 'ready_for_pickup') : null;
  picked_up = orderStatus.slice().reverse().find(status => status.status === 'picked_up') ? orderStatus.slice().reverse().find(status => status.status === 'picked_up') : null;
  dropped_off = orderStatus.slice().reverse().find(status => status.status === 'dropped_off') ? orderStatus.slice().reverse().find(status => status.status === 'dropped_off') : null;
  dispatched = orderStatus.slice().reverse().find(status => status.status === 'dispatched') ? orderStatus.slice().reverse().find(status => status.status === 'dispatched') : null;
  out_for_delivery = orderStatus.slice().reverse().find(status => status.status === 'out_for_delivery') ? orderStatus.slice().reverse().find(status => status.status === 'out_for_delivery') : null;
  delivered = orderStatus.slice().reverse().find(status => status.status === 'delivered') ? orderStatus.slice().reverse().find(status => status.status === 'delivered') : null;
  undeliverable = orderStatus.slice().reverse().find(status => status.status === 'undeliverable') ? orderStatus.slice().reverse().find(status => status.status === 'undeliverable') : null;


  console.log('new_order: ', new_order);
  console.log('ready_for_pickup: ', ready_for_pickup);
  console.log('picked_up: ', picked_up);
  console.log('dropped_off: ', dropped_off);
  console.log('dispatched: ', dispatched);
  console.log('out_for_delivery: ', out_for_delivery);
  console.log('delivered: ', delivered);
  console.log('undeliverable: ', undeliverable);

  let statuses = {
      'new_order':        { 'status': new_order         ? 'completed' : 'pending', 'timestamp': new_order         ? new_order.timestamp         : null, 'users': ['vendor'],                    'prereq': null },
      'ready_for_pickup': { 'status': ready_for_pickup  ? 'completed' : 'pending', 'timestamp': ready_for_pickup  ? ready_for_pickup.timestamp  : null, 'users': ['vendor'],                    'prereq': 'new_order' },
      'picked_up':        { 'status': picked_up         ? 'completed' : 'pending', 'timestamp': picked_up         ? picked_up.timestamp         : null, 'users': ['driver', 'depot'],           'prereq': 'ready_for_pickup' },
      'dropped_off':      { 'status': dropped_off       ? 'completed' : 'pending', 'timestamp': dropped_off       ? dropped_off.timestamp       : null, 'users': ['driver', 'depot'],           'prereq': 'picked_up' },
      'dispatched':       { 'status': dispatched        ? 'completed' : 'pending', 'timestamp': dispatched        ? dispatched.timestamp        : null, 'users': ['depot'],                     'prereq': 'dropped_off' },
      'out_for_delivery': { 'status': out_for_delivery  ? 'completed' : 'pending', 'timestamp': out_for_delivery  ? out_for_delivery.timestamp  : null, 'users': ['driver', 'depot'],           'prereq': 'dispatched' },
      'delivered':        { 'status': delivered         ? 'completed' : 'pending', 'timestamp': delivered         ? delivered.timestamp         : null, 'users': ['vendor', 'driver', 'depot'], 'prereq': 'out_for_delivery' },
      'undeliverable':    { 'status': undeliverable     ? 'completed' : 'pending', 'timestamp': undeliverable     ? undeliverable.timestamp     : null, 'users': ['vendor', 'driver', 'depot'], 'prereq': 'ready_for_pickup' }
    };


// const StatusDisplay = (props) => {
//   console.log('StatusDisplay pps: ', props);
//   // Find each status level attained and timestamp

//   let statuses = {
//     'new_order': {'status': 'completed', 'timestamp': null},
//     'ready_for_pickup':  {'status': 'pending', 'timestamp': null},
//     'picked_up': {'status': 'pending', 'timestamp': null},
//     'dropped_off': {'status': 'pending', 'timestamp': null},
//     'dispatched': {'status': 'pending', 'timestamp': null},
//     'out_for_delivery': {'status': 'pending', 'timestamp': null},
//     'delivered': {'status': 'pending', 'timestamp': null},
//     'undeliverable': {'status': 'pending', 'timestamp': null}
//   };
//   const orderStatus = props.orderStatus;
//   orderStatus.forEach((orderStatus, index) => {
//     console.log('index:', index, '  orderStatus.status:', orderStatus.status, ' | timestamp: ', orderStatus.timestamp);
//     statuses[orderStatus.status].status = 'completed';
//     statuses[orderStatus.status].timestamp = orderStatus.timestamp;
//   })

  console.log('statuses:', statuses);

  //set background color of all statuses less than or equal to current status
  console.log('status-display props: ', props); 

  //console.log('status-button status2: ', status);
  let myStatuses = Object.entries(statuses);   //create key, value pairs
  console.log('myStatuses: ', myStatuses);

  let fragment1 = myStatuses.map((key, index) => {
    if (index < 4) {
      // let myClass = `status_${index}`;
      console.log('*** StatusDisplay key', index, ': ', key);
      let myStatus = key[0].replace(/_/g, " ");
      myStatus = myStatus.charAt(0).toUpperCase() + myStatus.substring(1);
      console.log('frag1 key[0]: ', key[0], '  key[1].status: ', key[1].status, '  key[1].timestamp: ', key[1].timestamp);
      console.log('*** myStatus', myStatus);
      let updated = null;
      if (key[1].timestamp !== null) {
         updated = `Updated ${TimeAgo(key[1].timestamp)}`;
      }

     return (

        <div className="status-button" key={index}>
          <button className={key[1].status} onClick={() => { console.log('+++CLICKED+++');props.handleStatusClick(props.userId, props.userType, props.component, key[0], new Date(), props.id) }}>
            <p className="status">{myStatus}</p>
            <p className="updated">{updated}</p>
          </button>
        </div>

      );
    }
    return null;
  });

  let fragment2 = myStatuses.map((key, index) => {
    if (index >= 4) {
      let myStatus2 = key[0].replace(/_/g, " ");
      myStatus2 = myStatus2.charAt(0).toUpperCase() + myStatus2.substring(1);
      console.log('frag2 key[0]: ', key[0], '  key[1]: ', key[1]);
      console.log('*** myStatus2', myStatus2);
      let updated2 = null;
      if (key[1].timestamp !== null) {
        updated2 = `Updated ${TimeAgo(key[1].timestamp)}`;
     }
      return (

        <div className="status-button" key={index}>
          <button className={key[1].status} onClick={() => { props.handleStatusClick(props.userId, props.userType, props.component, key[0], new Date(), props.id) }}>
            <p className="status">{myStatus2}</p>
            <p className="updated">{updated2}</p>
          </button>
        </div>

      );
    }
    return null;
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