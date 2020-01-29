import React, { Fragment } from 'react';
import ShowDetails from './show-details';
import DeliveryBasic from './delivery-basic';
import DeliveryDetail from './delivery-detail';

const Delivery = (props) => {
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  if (showDetails) {
    return (
      <Fragment>
        <li className="delivery">
          <ShowDetails component="delivery" updatedAt={props.updatedAt} handleDetailsClick={props.handleDetailsClick} index={props.index} id={props._id} orderNumber={props.order.orderNumber} /> 
          <DeliveryDetail component="delivery" {...props}  />
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="delivery">
        <ShowDetails component="delivery" updatedAt={props.updatedAt} handleDetailsClick={props.handleDetailsClick} index={props.index} id={props._id} orderNumber={props.order.orderNumber} /> 
        <DeliveryBasic component="delivery" {...props}  />
      </li>     
    </Fragment> 
  );
};

export default Delivery;