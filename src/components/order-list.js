import React from 'react';
import Order from './order';

export default function OrderList(props) {
  
console.log('order-list props: ', props);

const orders = props.orders;
  return (
    <div className="section">
      <h3 className="reverse">ORDER LIST</h3>
      <ul className="order-list">
        {orders.map((order, index) => {        
          return(
            <Order
              userId={props.userId}
              key={index}
              id={order._id}
              index={index}
              destination={order.destination}
              orderDescription={order.orderDescription}
              orderSize={order.orderSize}
              orderNumber={order.orderNumber}
              orderStatus={order.orderStatus}
              vendor={order.vendor}
              handleStatusClick={props.handleStatusClick}
              showDetails={props.showDetails}
              userType={props.userType}
            />
          )
          })}
      </ul>
    </div>
  );
}
