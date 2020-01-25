import React from 'react';
const PickupStatus = (props) => {
  console.log('pickup-pickupStatus props: ', props);
  console.log('pickup-pickupStatus props.pickupStatus: ', props.pickupStatus);
  const statusClass = `${props.pickupStatus} circle`;   
  return (
    <button className={statusClass} onClick={() => { props.handleClick(props.pickupStatus, props.pickup._id)}}>
      {props.pickupStatus}
    </button>
  );
};

export default PickupStatus;