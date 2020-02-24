import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LoginForm from './login-form';
import HeaderBar from './header-bar';
// import '../styles/forms.css';

export class LogIn extends React.Component {

  
  render() {
    return (
      <Fragment>
        <main aria-live="assertive" className="main textCenter" role="main">
          <HeaderBar />
          <LoginForm />
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current:  state.delivery
});

export default connect(mapStateToProps)(LogIn);
