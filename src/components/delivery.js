import React, { Fragment } from 'react';
import Status from './status';
import Details from './details';
import TimeAgo from './timeAgo';
import DeliveryBasic from './delivery-basic'
const Delivery = (props) => {
  // const delivery = props;
  console.log('props.js props: ', props);
  // const handleDetailsClick= props.handleDetailsClick;
  return (
    <Fragment>
      <li className="delivery">

      <Details activity="delivery" handleDetailsClick={props.handleDetailsClick} index={props.index} _id={props._id} /> 
      <DeliveryBasic activity="delivery" {...props}  />
    {/* <p>
        <Status activity="delivery" handleStatusClick={props.handleStatusClick} status={props.deliveryStatus} _id={props._id} /> 
        <br /><span className="bold"> Updated </span> {TimeAgo(props.updatedAt)} 
      </p>
       <p>
        <span className="big  bold"> Destination: </span>
        <br />{props.order.destination.recipient.businessName}
        <br /><span className="bold">
        {props.order.destination.recipient}        
        </span>
        <br />
          { 
          ' ' + props.order.destination.streetAddress}
          <br />
          {
          ' ' + props.order.destination.city  + 
          ', ' + props.order.destination.state  + 
          ' ' + props.order.destination.zipcode          
        }
      <br />{props.order.destination.recipient.recipientPhone}
      <br />{props.order.destination.instructions}
      </p>       
      <p><span className="big  bold"> Order: </span><br /><span className="big  bold">{props.order.orderNumber} </span></p>   */}
      </li>     
    </Fragment> 
  );
};

export default Delivery;