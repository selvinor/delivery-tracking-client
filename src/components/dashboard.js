import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderBar from './header-bar';
import OrderList from './order-list';
import DeliveryList from './delivery-list';
import PickupList from './pickup-list';
import DriverList from './driver-list';

import { updatePickupStatus } from '../actions/pickups';
import { updateDeliveryStatus } from '../actions/deliveries';
import { updateOrderStatus } from '../actions/protected-data';

import { fetchProtectedData } from '../actions/protected-data';
import { showDetailsClicked } from '../actions/protected-data';
import { deleteOrder } from '../actions/protected-data';

// import { refreshAuthToken } from '../actions/auth';

export class Dashboard extends React.Component {
  // This component has these responsibilities:
  //    1)  Show today's Orders 
  //    2)  change order status from pending to ready and back
  //    3)  delete Order from list
  //    4)  select and show Order detail   

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleStatusClick = this.handleStatusClick.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
  }

  componentDidMount() {
    document.title = 'Dashboard';
    if (this.props.currentUser) {
      this.props.dispatch(fetchProtectedData(this.props.currentUser.id));
    }
  }

  handleStatusClick(userId, userType, component, status, timestamp, id) {
    console.log('*** handleStatusClick: ','userType: ', userType, ' |  component: ', component, '| status: ', status, '| timestamp: ', timestamp, '| id: ', id, ' ***');
    if (component === 'pickup') {
      this.props.dispatch(updatePickupStatus(userType, status, timestamp, id));
    } else {
      if (component === 'delivery') {
        this.props.dispatch(updateDeliveryStatus(userType, status, timestamp, id));
      } else {
        if (component === 'order') {
          //console.log('dispatching updateOrderStatus')
          this.props.dispatch(updateOrderStatus(userId, userType, status, timestamp, id));
        }
      }
    }
  }
  handleDetailsClick(component, index, id) {
    this.props.dispatch(showDetailsClicked(component, id));
  }

  handleDeleteOrder(id) {
    return this.props
      .dispatch(deleteOrder(id))
      .then(() => this.props.dispatch(fetchProtectedData(id)))
  }



  render() {
    // Only render the log out button if we are logged in
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    };

    // if (this.props.showWarning) {
    //   let stayLoggedInButton = (
    //     <button onClick={() => this.props.dispatch(refreshAuthToken())}>Keep me logged in</button>
    //   );
    // }


    let fragment = null;
    let user = this.props.user;
    if (user) {
      if (user.vendor) {   // Display components and send props to components based on who's logged in
        fragment = (
          <Fragment>
            <HeaderBar />
            <h1>Vendor Dashboard - {user.vendor.userName}</h1>
            <h2>Order Tracking</h2>
            <OrderList userType='vendor' orders={user.vendor.orders} submitNewOrderForm={this.submitNewOrderForm} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} handleDeleteOrder={this.handleDeleteOrder} showDetails={this.props.showDetails} />
          </Fragment>
        )

      } else {
        if (user.driver) { // Display components and send props to components based on who's logged in
          fragment = (
            <Fragment>
              <HeaderBar />
              <h1>Driver Dashboard - {user.driver.userName}</h1>
              <h2>Pickup and Delivery Tracking</h2>
              <PickupList userType='driver' pickups={user.driver.pickups} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
              <DeliveryList userType='driver' deliveries={user.driver.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
            </Fragment>
          )
        } else {
          if (user.depot) { // Display components and send props to components based on who's logged in
            // console.log('user.depot.vendors.length: ', user.depot.vendors.length);

            let orders = user.depot.vendors.map(vendor => {
              // console.log('vendor: ', vendor);
              return vendor.orders;
            });
            if (orders) {
              // console.log('typeof(orders): ', typeof (orders));
              // console.log('dashboard depot orders: ', orders);
              // const allOrders = orders.flat();
              let allOrders = [];
              // console.log('orders[0]: ', orders[0]);
              allOrders = [].concat.apply([], orders);
              // console.log('allOrders: ', allOrders);
              console.log('this.props.currentUser: ', this.props.currentUser);

              fragment = (
                <Fragment>
                  <HeaderBar />
                  <h2>Depot Dashboard - {this.props.currentUser.username}</h2>
                  <OrderList userId={this.props.currentUser.id} userType='depot' orders={allOrders} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
                  <PickupList userType='depot' pickups={user.depot.pickups} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
                  <DeliveryList userType='depot' deliveries={user.depot.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
                  <DriverList userType='depot' drivers={user.depot.drivers} pickups={user.depot.pickups} deliveries={user.depot.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
                </Fragment>
              )
            }
          }
        }
      }
      return fragment;
    }
  }
}
const mapStateToProps = state => {
  const { currentUser } = state.auth;

  return {
    user: state.protectedData.user,
    showWarning: state.auth.showWarning,
    showLogin: state.auth.showLogin,
    loggedIn: state.auth.currentUser !== null,
    currentUser: currentUser,
    showDetails: state.protectedData.showDetails
  };
};

export default connect(mapStateToProps)(Dashboard);
