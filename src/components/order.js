import React, { Fragment } from 'react';
import OrderBasic from './order-basic';
import OrderDetail from './order-detail';

const Order = (props) => {
  console.log('order props: ', props);
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-'
  if (showDetails) {
    let detailsButtonText = '-LESS-'
    return (
      <Fragment>
        <li className="dashboard">
          <OrderDetail component="order" {...props}  detailsButtonText={detailsButtonText}  />
        </li>     
      </Fragment> 
    ); 
  }
  return (
    <Fragment>
      <li className="dashboard">
        <OrderBasic component="order" {...props} detailsButtonText={detailsButtonText} />
      </li>     
    </Fragment> 
  );
};

export default Order;