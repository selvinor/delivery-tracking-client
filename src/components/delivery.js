import React, { Fragment } from 'react';
import DeliveryBasic from './delivery-basic';
import DeliveryDetail from './delivery-detail';

const Delivery = (props) => {
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="delivery">
          <DeliveryDetail component="delivery" {...props}  detailsButtonText={detailsButtonText}  />
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="delivery">
        <DeliveryBasic component="delivery" {...props} detailsButtonText={detailsButtonText} />
      </li>     
    </Fragment> 
  );
};

export default Delivery;