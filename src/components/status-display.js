import React, { Fragment } from 'react';
import TimeAgo from './timeAgo';
import StatusButton from './status-button';

const StatusDisplay = (props) => {
  console.log('StatusDisplay props: ', props);
  // Find each status level attained and timestamp
  const orderStatus = props.orderStatus;
  // console.log('***orderStatus : ', orderStatus);
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



  
//get latest status update of type
  let statuses = {
      'new_order':        { 'status': new_order         ? 'completed' : 'pending', 'timestamp': new_order         ? new_order.timestamp         : null, 'users': ['vendor'],                    'prereq': null },
      'ready_for_pickup': { 'status': ready_for_pickup  ? 'completed' : 'pending', 'timestamp': ready_for_pickup  ? ready_for_pickup.timestamp  : null, 'users': ['vendor'],                    'prereq': 'new_order' },
      'picked_up':        { 'status': picked_up         ? 'completed' : 'pending', 'timestamp': picked_up         ? picked_up.timestamp         : null, 'users': ['driver', 'depot'],           'prereq': 'ready_for_pickup' },
      'dropped_off':      { 'status': dropped_off       ? 'completed' : 'pending', 'timestamp': dropped_off       ? dropped_off.timestamp       : null, 'users': ['driver', 'depot'],           'prereq': 'picked_up' },
      'dispatched':       { 'status': dispatched        ? 'completed' : 'pending', 'timestamp': dispatched        ? dispatched.timestamp        : null, 'users': ['depot'],                     'prereq': 'dropped_off' },
      'out_for_delivery': { 'status': out_for_delivery  ? 'completed' : 'pending', 'timestamp': out_for_delivery  ? out_for_delivery.timestamp  : null, 'users': ['driver', 'depot'],           'prereq': 'dispatched' },
      'delivered':        { 'status': delivered         ? 'completed' : 'pending', 'timestamp': delivered         ? delivered.timestamp         : null, 'users': ['vendor', 'driver', 'depot'], 'prereq': 'out_for_delivery' },
      'undeliverable':    { 'status': undeliverable     ? 'undeliverable' : 'pending', 'timestamp': undeliverable     ? undeliverable.timestamp     : null, 'users': ['vendor', 'driver', 'depot'], 'prereq': 'ready_for_pickup' }
    };

  // console.log('statuses:', statuses);

  //set background color of all statuses less than or equal to current status
  console.log('status-display props: ', props); 

  //console.log('status-button status2: ', status);
  let displayStatuses = Object.entries(statuses);   //create key, value pairs
  // console.log('displayStatuses: ', displayStatuses);
  const forwardClick= (index, userId, userType, component, status, timestamp, id) => {   //check if previous status has updated yet
    console.log('***forward click on button', index, userId, userType, component, status, timestamp, id);

    console.log ('curr status: ', status, 'statuses: ', statuses);
    props.handleStatusClick(userId, userType, component, status, timestamp, id) ;
  };

  let fragment1 = displayStatuses.map((key, index) => {
    if (index < 4) {
      let displayStatus = key[0].replace(/_/g, " ");
      displayStatus = displayStatus.charAt(0).toUpperCase() + displayStatus.substring(1);

      let updated = null;
      if (key[1].timestamp !== null) {
         updated = `Updated ${TimeAgo(key[1].timestamp)}`;
      }

     return (
        <StatusButton  onClick={() => {forwardClick(index={index}, props.userId, props.userType, props.component, key[0], new Date(), props.id) }} status={key[1].status} displayStatus={displayStatus} key={index} index={index} updated={updated}/>
      );
    }
    return null;
  });

  let fragment2 = displayStatuses.map((key, index) => {      //customize status button text
    if (index >= 4) {
      let displayStatus2 = key[0].replace(/_/g, " ");
      displayStatus2 = displayStatus2.charAt(0).toUpperCase() + displayStatus2.substring(1);    
      if (displayStatus2 === 'Dispatched') {
        displayStatus2 = 'Click to Dispatch';
      }
      if (displayStatus2 === 'Undeliverable') {
        displayStatus2 = 'Click if Undeliverable';
      }

      let updated2 = null;
      if (key[1].timestamp !== null) {
        updated2 = `Updated ${TimeAgo(key[1].timestamp)}`;
        if (displayStatus2 === 'Click to Dispatch') {
          displayStatus2 = 'Dispatched';
        }
        if (displayStatus2 === 'Click if Undeliverable') {
          displayStatus2 = 'Undeliverable';
        }
     }
      return (
        <StatusButton 
          onClick={() => {forwardClick(index={index}, props.userId, props.userType, props.component, key[0], new Date(), props.id) }} 
          status={key[1].status} 
          displayStatus={displayStatus2} 
          index={index} updated={updated2}
          key={index}
        />
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