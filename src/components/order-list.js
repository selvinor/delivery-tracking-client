import React from 'react';
import Order from './order';

export default function OrderList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Orders 
  //    2)  change order status from pending to ready and back
  //    3)  delete Order from list
  //    4)  select and show Order detail   
//console.log('order-list props: ', props);
console.log('order-list props: ', props);
if (props.ordersByVendor) {
  const ordersByVendor = props.ordersByVendor;
  console.log('typeof(ordersByVendor): ', typeof(ordersByVendor));
  // const allOrders = ordersByVendor.flat();
  let allOrders=[];
console.log('ordersByVendor[0]: ', ordersByVendor[0]);
allOrders = [].concat.apply([],ordersByVendor);
console.log('allOrders: ', allOrders);

  return (
        <div>
          <h3>Orders</h3>
          <ul className="order-list">
            {allOrders.map((order, index) => {
              console.log('mapping order: ', order.orderNumber, ' index: ', index)
              return(
                <Order
                  key={index}
                  index={index}
                  destination={order.destination}
                  orderDescription={order.orderDescription}
                  orderSize={order.orderSize}
                  orderNumber={order.orderNumber}
                  orderStatus={order.orderStatus}
                  vendor={order.vendor}
                  showDetails={props.showDetails}
                  // {...props}
                />
              )
              })}
          </ul>
        </div>
      );
  
  } else {
    return null;
  }
}
