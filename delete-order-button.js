import React from 'react';
const DeleteOrderButton = (props) => {
// //console.log('delete-button props: ', props);
  return (
    <button className="delete Button" onClick={() => { props.handleDeleteOrder(props._id)}}>
      <p className="details">-DELETE-</p>
    </button>

  );
};

export default DeleteOrderButton;