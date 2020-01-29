import React from 'react';
const Details = (props) => {
  console.log('details props: ', props);
  const detailsClass = `${props.details} Button`;   
  return (
    <button className={detailsClass} onClick={() => { props.handleDetailsClick(props.activity, props.index, props._id)}}>
      {props.index +1}
    </button>
  );
};

export default Details;