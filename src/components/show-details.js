import React from 'react';
const ShowDetails = (props) => {
let order = '';
if (props.orderNumber) {
  order = 'Order: ' + props.orderNumber;
}
  const detailsClass = `${props.details} Button`;   
  return (
    <button className="Button" onClick={() => { props.handleDetailsClick(props.component, props.index, props.id)}}>
      <p className="bold">{props.component.charAt(0).toUpperCase() + props.component.substring(1)} #{props.index +1}</p>
      <p>{order}</p>
      <p>Details</p>
    </button>

  );
};

export default ShowDetails;