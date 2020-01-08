import React from 'react';

let newOrderFields;
const OrderForm = (props) => {
  if (props.newOrderFields) {
    if(props.newOrderFields.length >= 1) {
      newOrderFields = props.newOrderFields.map((field, index)=> (
        <li className="newOrder" key={index} index={index}>
          <div className='wrapper'>
            <div className='row'>
              <div className='column'>
                <div className='blue-column'>
                  <label htmlFor={field}>{field}</label>
                </div>
              </div>
              <div className='column'>
                <div className='green-column'>
                  <input className="form-control" type="input" name={field}  />
                </div>
              </div>
            </div>
          </div>
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