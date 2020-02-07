import React, { Fragment } from 'react';
import OrderBasic from './order-basic';
import OrderDetail from './order-detail';
import StatusButton from './status-button';
import ShowDetailsButton from './show-details-button';
import DeleteOrderButton from './delete-order-button';

const Order = (props) => {
  //console.log('order props: ', props);
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
          component="order" 
          handleStatusClick={props.handleStatusClick} 
          updated={props.orderStatus[props.orderStatus.length - 1].timestamp} 
          status={props.orderStatus[props.orderStatus.length - 1].status} 
          orderNumber={props.orderNumber} 
          index={props.index} 
        />
        <OrderDetail component="order" {...props}  detailsButtonText={detailsButtonText}  />
        <ShowDetailsButton detailsButtonText={detailsButtonText} component="order" index={props.index} _id={props._id}handleDetailsClick={props.handleDetailsClick} />  
        <DeleteOrderButton component="order" {...props} />    
       </li>     
      </Fragment> 
    ); 
  } else {
    return (
      <Fragment>
        <li className="dashboard">
          <StatusButton 
            id={props._id}
            userType={props.userType}
            component="order" 
            handleStatusClick={props.handleStatusClick} 
            updated={props.orderStatus[props.orderStatus.length - 1].timestamp} 
            status={props.orderStatus[props.orderStatus.length - 1].status} 
            orderNumber={props.orderNumber} 
            index={props.index} 
          />
          <OrderBasic component="order" {...props} detailsButtonText={detailsButtonText} />
          <ShowDetailsButton  detailsButtonText={detailsButtonText} component="order" index={props.index} _id={props._id}handleDetailsClick={props.handleDetailsClick} />  
          <DeleteOrderButton component="order" {...props} />    
      </li>     
      </Fragment> 
    );
  }

};

export default Order;