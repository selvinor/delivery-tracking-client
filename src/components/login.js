import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login-form';
// import '../styles/forms.css';

export class LogIn extends React.Component {

  
  render() {
    return (
      <main aria-live="assertive" className="main textCenter" role="main">
        <LoginForm />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  current:  state.delivery
});

export default connect(mapStateToProps)(LogIn);
