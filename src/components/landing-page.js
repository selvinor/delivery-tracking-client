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
    // console.log('landing this.props: ', this.props);
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Fragment>
        <section id="main">
        <h2>Order Pickup and Delivery Tracking</h2>
        <p>To submit an Order for Pickup and Delivery, Please login.</p>
          <LogIn />
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  showLogin: state.order.showLogin,
  returningUser : state.auth.returningUser,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
