import React, { Fragment } from 'react';


const Delivery = (props) => {
const delivery = props.delivery;
console.log('depot deliveries props: ', delivery)
let localDate = new Date(delivery.updatedAt);
// const str =localDate.slice(0,24);
console.log('localDate: ', localDate.toString().slice(0,24));
let myDate = localDate.toString().slice(0,24);
  return (
    <Fragment>
      <li className="delivery">
        <p className="status-text"><span className="bold ">Status:</span><br />{delivery.deliveryStatus}<br />{myDate} </p>
        <p className="order-text"><span className="bold"> Order: </span><br />{delivery.order.orderNumber} </p>  
        {/* <p className="delivery-text"><span className="bold"> Delivery Zone: </span><br />{delivery.zone.zoneName} </p>    */}
        <p className="vendor-text"><span className="bold"> Vendor: </span><br />{delivery.order.vendor.vendorName} </p>  
        <p className="dest-text"><span className="bold"> Destination: </span><br />{delivery.order.destination.streetAddress}<br />{delivery.order.destination.city}, {delivery.order.destination.state} {delivery.order.destination.zipcode}<br />{delivery.order.destination.recipient}</p> 
        {/* <p className="numItems-text center"><span className="bold"> Num items: </span><br />{delivery.order.orderSize} </p>  */}
        <p className="driver-text"><span className="bold"> Driver: </span><br />{delivery.deliveryDriver.driverName} </p> 
      </li>     
    </Fragment>
  );
};

export default Delivery; 