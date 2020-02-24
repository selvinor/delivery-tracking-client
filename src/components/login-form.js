import React, { Fragment } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import { Link } from 'react-router-dom';
//import './styles/login.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));

    }

    render() {

      let error;
      if (this.props.error) {
          error = (
              <div className="form-error" aria-live="polite">
                  {this.props.error}
              </div>
          );
      }
      const forgotPassword = (<button className="forgotPassword" type="button"><Link style={{textDecoration:'none', color:'black', fontSize:'.7vw'}} to="/forgotPassword" >Forgot password</Link></button>);

      return (
        <Fragment>
        <section className="signin">
          <section className="login-section">
          <p>Please login to continue.</p>
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
              {error}
              <label htmlFor="username">demo username= "depot1"</label>
              <Field
                  component={Input}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  autocomplete="username"
                  validate={[required, nonEmpty]}
              />
              <label htmlFor="password">demo password = "depot1"</label>
              <Field
                  component={Input}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  validate={[required, nonEmpty]}
              />
              <div className="login-button">
                <button className="login" disabled={this.props.pristine || this.props.submitting}>
                    Sign in
                </button>
                {forgotPassword}
              </div>
            </form>
          </section>
        </section>
      </Fragment>
      );
  }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
