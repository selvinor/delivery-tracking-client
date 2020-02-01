import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogIn from './login';
//import './styles/landing.css';

export class LandingPage extends React.Component { 

  componentDidMount() {
    document.title = 'Landing';
  }
  
  render() {
  // If we are logged in redirect straight to the user's dashboard
  // Log the initial state
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Fragment>
        <section id="main">
        <h2>Order Pickup and Delivery Tracking</h2>
        <p>Please login to continue.</p>
          <LogIn />
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  
  showLogin: state.auth.showLogin,
  returningUser : state.auth.returningUser,
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser  
});

export default connect(mapStateToProps)(LandingPage);
