import React from 'react';

let newOrderFields;
const OrderForm = (props) => {
  if (props.newOrderFields) {
    if(props.newOrderFields.length >= 1) {
      newOrderFields = props.newOrderFields.map((field, index)=> (
        <li className="newOrder" key={index} index={index}>
          {/* <label htmlFor={field}>{field}</label> */}
          <input className="form-control" type="input" name={field} placeholder={field}  />
        </li>  
      ))
    }

  }


  return (
    <div className="newOrder">
      <form className='newOrder-form' onSubmit={(e) => props.submitNewOrderForm(e)}>
        <ul className="order-form">
          {newOrderFields}
        </ul>
        <p><button type="submit" className='btn btn-success'>Add Order</button></p>
      </form>
      </div>
  );
};

export default OrderForm;