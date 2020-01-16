import React from 'react';

const PickupStatus = (props) => {
  let circleColor;
  let statusMsg;
  console.log('pickup-status props: ', props);
  console.log('pickup-status props.status: ', props.status);
  console.log('pickup-status props.handleClick: ', (props.handleClick()));
  switch (props.status) {
    case 'pickedUp': 
      circleColor='circle green';
      statusMsg = 'Picked up';
      break;
    case 'droppedOff':
      circleColor='circle red';
      statusMsg = 'Dropped off';
      break;
    default:
      circleColor='circle yellow';
      statusMsg = 'Pending';
  }

  return (
    <button className={circleColor} onClick={props.handleClick()}>
      {statusMsg}
    </button>
  );
};

export default PickupStatus;