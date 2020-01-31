import React from 'react';
const ShowDetailsButton = (props) => {
console.log('show-details-button props: ', props);
  const detailsClass = `${props.details} Button`; 
  return (
    <button className="Button" onClick={() => { props.handleDetailsClick(props.component, props.index, props._id)}}>
      <p className="details">{props.detailsButtonText}</p>
    </button>

  );
};

export default ShowDetailsButton;