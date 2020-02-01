import React from 'react';
import Order from './order';
import OrderForm from './order-form';
export default function OrderList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Orders 
  //    2)  change order status from pending to ready and back
  //    3)  delete Order from list
  //    4)  select and show Order detail   
console.log('order-list props: ', props);
const orders = props.orders;
const newOrderFields = ['orderNumber',  'orderDetails', 'orderSize', 'recipient','phone', 'businessName','streetAddress', 'city', 'state', 'zipcode', 'instructions'];
const submitNewOrderForm = props.submitNewOrderForm;

return (
      <div>
        <h3>Orders</h3>
        <ul className="order-list">
          {orders.map((order, index) => (
            <Order
              key={index}
              index={index}
              {...order}
              {...props}
            />
          ))}
        </ul>
        <OrderForm className="order-form" newOrderFields={newOrderFields} submitNewOrderForm={submitNewOrderForm} />
      </div>
    );
}
