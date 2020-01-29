import React from 'react';
const ShowDetails = (props) => {
  const detailsClass = `${props.details} Button`;   
  return (
    <button className="Button" onClick={() => { props.handleDetailsClick(props.component, props.index, props.id)}}>
      <span className="bold">{props.component.charAt(0).toUpperCase() + props.component.substring(1)} #{props.index +1}</span>
      <br />Order: {props.orderNumber}
    </button>

  );
};

export default ShowDetails;