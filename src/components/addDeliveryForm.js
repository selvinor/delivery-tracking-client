import React, { Fragment } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty} from '../validators';

//import { setSection, setNumberOfDeliveries, setProductChoice, setFrequency, setDuration, setDeliveryDate } from '../actions';
//import {API_BASE_URL} from '../config';

export class AddDeliveryForm extends React.Component {

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className= "message message-success">
          Your delivery has been added!
        </div>
      );
    }
  
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }

    const validateFields = function(section){

     let  fieldsToCheck = [0,1,3,5,6,7,8];
//     let  destination = 'schedule';
     let  formSection = 'recipient-page';
      
      const check = document.getElementById(formSection).getElementsByTagName("input");
      let len = check.length;
//      let badFieldCount = 0;
      let badFields = [];
  
  
      
      for(let  i=0; i<len; i++) {  
        if (check[i].value === '' && fieldsToCheck.includes(i)) {
 //         badFieldCount++;
          badFields.push(i);
          check[i].placeholder = check[i].name.substring(9) + " is required";
        }
      }   
        

//      badFieldCount = 0;
 
    }
    return (
      <Fragment>
        <section id="addDelivery-form">
          <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            {successMessage}
            {errorMessage}           

            <ul className="recipients-info">
              <li>
                <h5>PLEASE ENTER RECIPIENT INFO:</h5>
              </li>
              <li>            
                <div className="form-input recipientInfoFields1">             
                  <label htmlFor="recipientFirstName" className="recipientFirstName">FIRST NAME
                    <Field
                      name="recipientFirstName"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>
                  <label htmlFor="recipientLastName" className="recipientLastName">LAST NAME                           
                    <Field
                      name="recipientLastName"
                      type="text"
                      component={Input}
                      placeholder="Required" 
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientCompany" className="recipientCompany">COMPANY                           
                    <Field
                      name="recipientCompany"
                      type="text"
                      component={Input}
                      placeholder="" 
                    />
                  </label>                            
                  <label htmlFor="recipientAddress" className="recipientAddress">STREET ADDRESS                            
                    <Field
                      name="recipientAddress"
                      type="text"
                      component={Input}
                      placeholder="Required" 
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientAptSuite" className="recipientAptSuite">APT /SUITE                            
                    <Field
                      name="recipientAptSuite"
                      type="text"
                      component={Input}
                      placeholder=""
                    />
                  </label>                                    
                  <label htmlFor="recipientCity" className="recipientCity">CITY                            
                    <Field
                      name="recipientCity"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor=">recipientState" className="recipientState">STATE                            
                    <Field
                      name="recipientState"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientZipcode" className="recipientZipcode">ZIP CODE                          
                    <Field
                      name="recipientZipcode"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>             
                  <label htmlFor="recipientPhone" className="recipientPhone">CELL PHONE                           
                    <Field
                      name="recipientPhone"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>             
                  <label htmlFor="recipientMessage" className="recipientMessage">MESSAGE                              
                    <Field
                      name="recipientMessage"
                      type="textarea"
                      rows="4" 
                      cols="50"
                      component={Input}
                      placeholder="Why are you sending?"
                    /> 
                  </label>                    
                </div>
                <div className="recipientData">
                  <button className="formButton jump"  onClick={() => validateFields('recipient-page')}  type="button">NEXT</button>
                </div>
              </li>
            </ul>
          </form>
        </section>
      </Fragment>
    )
  };
}

export default reduxForm({ 
  form: 'delivery',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('delivery', Object.keys(errors)[0]))
})(AddDeliveryForm);