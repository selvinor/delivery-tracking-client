import React, { Fragment } from 'react';
import DeliveryBasic from './delivery-basic';
import DeliveryDetail from './delivery-detail';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';

const Delivery = (props) => {
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="dashboard">
          <StatusButton 
            id={props._id}
            userType={props.userType}
            component="delivery" 
            handleStatusClick={props.handleStatusClick} 
            updated={props.delivery.deliveryStatus[props.delivery.deliveryStatus.length - 1].timestamp} 
            status={props.delivery.deliveryStatus[props.delivery.deliveryStatus.length - 1].status} 
            orderNumber={props.delivery.orderNumber} 
            index={props.index} 
          />
          <DeliveryDetail component="delivery" {...props}  
            detailsButtonText={detailsButtonText}  />
          <ShowDetailsButton component="delivery" {...props} />   
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="dashboard">
        <StatusButton 
          id={props._id}
          userType={props.userType}
          component="delivery" 
          handleStatusClick={props.handleStatusClick} 
          updated={props.delivery.deliveryStatus[props.delivery.deliveryStatus.length - 1].timestamp} 
          status={props.delivery.deliveryStatus[props.delivery.deliveryStatus.length - 1].status} 
          orderNumber={props.delivery.orderNumber} 
          index={props.index} 
        />
        <DeliveryBasic component="delivery" {...props} detailsButtonText={detailsButtonText} />
        <ShowDetailsButton component="delivery" {...props} />   
      </li>     
    </Fragment> 
  );
};

export default Delivery;