import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderBar from './header-bar';
import OrderList from './order-list';
import DeliveryList from './delivery-list';
import PickupList from './pickup-list';
import DriverList from './driver-list';
import OrderForm from './order-form';

import { fetchProtectedData } from '../actions/protected-data';
import { refreshAuthToken } from '../actions/auth';

export class Dashboard extends React.Component {
  // This component has these responsibilities:
  //    1)  Show today's Orders 
  //    2)  change order status from pending to ready and back
  //    3)  delete Order from list
  //    4)  select and show Order detail   

    constructor(props) {
      super(props);
      this.state = {};
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.submitNewOrderForm = this.submitNewOrderForm.bind(this);
      }

  componentDidMount() {
    document.title = 'Dashboard';
    console.log('componentDidMount this.props', this.props);

    this.props.dispatch(fetchProtectedData(this.props.currentUser.id));
  }

  
  handleChange(e) { 
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }
//   'orderNumber',  'orderDetails', 'orderSize', 'recipient','recipientPhone', 'businessName','streetAddress', 'city', 'state', 'zipcode', 'instructions'];

  submitNewOrderForm(e) { 
    e.preventDefault();
    let errors = {}

    if(this.validateForm()) {
      let fields = {};
      this.setState({fields:fields});
    } else {
      errors['zip'] = 'Please enter a valid zip code';
      this.setState({errors: errors})
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['orderNumber']) {
      formIsValid = false;
      errors['orderNumber'] = 'Please enter an order number';
    }

    if (typeof fields['orderNumber'] !== 'undefined') {
      if (!fields['orderNumber'].match(/\d\w\S/)) {
        formIsValid = false;
        errors['orderNumber'] = 'Please enter a valid order number';
      }
    }
    if (!fields['orderSize']) {
      fields['orderSize'] = 1;
    }

    if (typeof fields['orderSize'] !== 'undefined') {
      if (!fields['orderSize'].match(/\d/)) {
        formIsValid = false;
        errors['orderSize'] = 'Please enter a valid order size 1-3';
      }
    }
    if (!fields['recipient']) {
      formIsValid = false;
      errors['recipient'] = 'Please enter a recipient name';
    }

    if (typeof fields['recipient'] !== 'undefined') {
      if (!fields['recipient'].match(/\w/)) {
        formIsValid = false;
        errors['recipient'] = 'Please enter a valid recipient name';
      }
    }
    if (!fields['recipientPhone']) {
      formIsValid = false;
      errors['recipientPhone'] = 'Please enter a recipient phone';
    }

    if (typeof fields['recipientPhone'] !== 'undefined') {
      if (!fields['recipientPhone'].match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g)) {
        formIsValid = false;
        errors['recipientPhone'] = 'Please enter a valid recipient phone';
      }
    }

    if (!fields['streetAddress']) {
      formIsValid = false;
      errors['streetAddress'] = 'Please enter a street address';
    }

    if (!fields['city']) {
      formIsValid = false;
      errors['city'] = 'Please enter a city';
    }

    if (!fields['state']) {
      formIsValid = false;
      errors['state'] = 'Please enter a state';
    }

    if (!fields['zipcode']) {
      formIsValid = false;
      errors['zipcode'] = 'Please enter a zipcode';
    }

    if (typeof fields['zipcode'] !== 'undefined') {
      if (!fields['zipcode'].match(/^\d{5}$|^\d{5}-\d{4}$/)) {
        formIsValid = false;
        errors['zipcode'] = 'Please enter a valid zipcode';
      }
    }
   
    
    this.setState({
      errors: errors
    });
    return formIsValid;
  }


  render() {
    // Only render the log out button if we are logged in
    if (!this.props.loggedIn) {
      console.log('Dashboard not logged in. Redirecting to landing page');
      return <Redirect to="/" />;
    };

    console.log('Dashboard in - this.props: ' , this.props);



    if (this.props.showWarning) {
      let stayLoggedInButton = (
        <button onClick={() => this.props.dispatch(refreshAuthToken())}>Keep me logged in</button>
      );
    }  
    let addOrderButton = (
      <button onClick={() => console.log('*** ADD ORDER ***')}>Add Order</button>
    );
    let fragment = null;
    let user = this.props.user;
    if (user) {
      console.log('dashboard user: ', user);
      console.log('dashboard user.vendor: ', user.vendor);
      console.log('dashboard user.driver: ', user.driver);
      console.log('dashboard user.depot: ', user.depot); 

      if(user.vendor) {
        fragment = (
          <Fragment>
            <HeaderBar />
            <h1>Vendor Dashboard - {user.vendor.vendorName}</h1>
              <h2>Order Tracking</h2>
            <OrderList orders={user.vendor.orders} submitNewOrderForm={this.submitNewOrderForm}/>
          </Fragment>  
        )

      } else {
        if(user.driver) {
          fragment = (
            <Fragment>
              <HeaderBar />
              <h1>Driver Dashboard - {user.driver.driverName}</h1>
                <h2>Pickup and Delivery Tracking</h2>
              <PickupList pickups={user.driver.pickups}/>
              <DeliveryList deliveries={user.driver.deliveries}/> 
            </Fragment>        
           )
        } else {
          if(user.depot) {
            console.log('*** user.depot.drivers: ', user.depot.drivers, '***');
            fragment = (
              <Fragment>
                <HeaderBar />
                <h1>{user.depot.depotName} Dashboard</h1>
                <DeliveryList deliveries={user.depot.deliveries}/>
                <PickupList pickups={user.depot.pickups}/>
                <DriverList drivers={user.depot.drivers}/>
              </Fragment>       
            ) 
          } 
        }
      } 
    }
    return fragment;
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;

  return {
    user: state.protectedData.user,
    // username: currentUser.username,
    // userId: currentUser.id,
    // email: currentUser.email,
    // name: `${currentUser.firstName} ${currentUser.lastName}`,
    showWarning: state.auth.showWarning,
    showLogin: state.order.showLogin,
    loggedIn: state.auth.currentUser !== null,   
    currentUser: currentUser 
  };
};


export default connect(mapStateToProps)(Dashboard);
