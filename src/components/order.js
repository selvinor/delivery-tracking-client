import React, { Fragment } from 'react';
import OrderBasic from './order-basic';
import OrderDetail from './order-detail';
import StatusDisplay from './status-display';

const Order = (props) => {
  console.log('*** order props: ', props);
  console.log('order props.orderStatus: ', props.orderStatus);
  let fragment = null;
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;

  if (showDetails) {
    fragment = (
      <Fragment>
        <li className="order" key={props.index}>
          <OrderDetail component="order" {...props} detailsButtonText='-LESS-' />
          <StatusDisplay
            userId={props.userId}
            userType={props.userType}
            component="order"
            handleStatusClick={props.handleStatusClick}
            orderStatus={props.orderStatus}
            orderNumber={props.orderNumber}
            index={props.index}
            orderDescription={props.orderDescription}
            orderSize={props.orderSize}
            id={props.id}
          />
        </li>
      </Fragment>
    );
  } else {
    fragment = (
      <Fragment>
        <li className="order" key={props.index}>
          <OrderBasic component="order" {...props} detailsButtonText='-MORE-' />
          <StatusDisplay
            userId={props.userId}
            userType={props.userType}
            component="order"
            handleStatusClick={props.handleStatusClick}
            orderStatus={props.orderStatus}
            orderNumber={props.orderNumber}
            index={props.index}
            id={props.id}
          />
        </li>
      </Fragment>
    );
  }

  return fragment;
};

export default Order;