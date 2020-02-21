import React, { Fragment } from 'react';
import OrderBasic from './order-basic';
import OrderDetail from './order-detail';
import StatusDisplay from './status-display';
import ShowDetailsButton from './show-details-button';
import DeleteOrderButton from './delete-order-button';

const Order = (props) => {
  console.log('*** order props: ', props);
  console.log('order props.orderStatus: ', props.orderStatus);
  let fragment = null;
  const showDetails = props.showDetails.findIndex(detail => detail.id === props._id) > -1;
  let detailsButtonText = '-MORE-';


  switch (props.userType) {
    case 'vendor':
      console.log('vendor');
      if (showDetails) {
        fragment = (
          <Fragment>
            <li>
              <StatusDisplay
                userType={props.userType}
                component="order"
                handleStatusClick={props.handleStatusClick}
                orderStatus={props.orderStatus}
                orderNumber={props.orderNumber}
                orderDescription={props.orderDescription}
                orderSize={props.orderSize}              
                index={props.index}
                id={props.id}
              />
              <OrderDetail component="order" {...props} detailsButtonText='-LESS-' />
            </li>
          </Fragment>
        );
      } else {
        fragment = (
          <Fragment>
            <li>
              <StatusDisplay
                userType={props.userType}
                component="order"
                handleStatusClick={props.handleStatusClick}
                orderStatus={props.orderStatus}
                orderNumber={props.orderNumber}
                index={props.index}
                id={props.id}
              />
              <OrderBasic component="order" {...props} detailsButtonText='-MORE-' />
              <ShowDetailsButton detailsButtonText={detailsButtonText} component="order" index={props.index} _id={props._id} handleDetailsClick={props.handleDetailsClick} />
              <DeleteOrderButton component="order" {...props} />
            </li>
          </Fragment>
        );
      }
      break;
    case 'depot':
      console.log('*** depot ***');
      if (showDetails) {
        fragment = (
          <Fragment>
            <li className="order">
              <OrderDetail component="order" {...props} detailsButtonText='-LESS-' />
              <StatusDisplay
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
            <li className="order">
              <OrderBasic component="order" {...props} detailsButtonText='-LESS-' />
              <StatusDisplay
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
      break;
    default:
      break;
  }

  return fragment;
};

export default Order;