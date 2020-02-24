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
    let userType = this.props.currentUser.userType;
    let allOrders = null;
    let orders = null;


    if (user) {
      let displayUserType = userType.charAt(0).toUpperCase() + userType.substring(1);
      let displayUserName = this.props.currentUser.username.charAt(0).toUpperCase() + this.props.currentUser.username.substring(1);
      if (userType === 'depot') {
        allOrders = user.depot.vendors.map(vendor => {
          // console.log('vendor: ', vendor);
          return vendor.orders;
        });
        if (allOrders) {
          let orders = [];
          // console.log('orders[0]: ', orders[0]);
          orders = [].concat.apply([], allOrders);
          // console.log('orders: ', orders);
          fragment = (
            <Fragment>
              <HeaderBar />
              <h2>{displayUserType} Dashboard - {displayUserName}</h2>
              <OrderList userId={this.props.currentUser.id} userType={userType} orders={orders} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
              {/* <PickupList userType='depot' pickups={user.depot.pickups} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
              <DeliveryList userType='depot' deliveries={user.depot.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
              <DriverList userType='depot' drivers={user.depot.drivers} pickups={user.depot.pickups} deliveries={user.depot.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} /> */}
            </Fragment>
          );
          return fragment;
    
        }
      } else {
        orders=user[userType]['orders'];
        fragment = (
          <Fragment>
            <HeaderBar />
            <h2>{displayUserType} Dashboard - {displayUserName}</h2>
            <OrderList userId={this.props.currentUser.id} userType={userType} orders={orders} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
            {/* <PickupList userType='depot' pickups={user.depot.pickups} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
            <DeliveryList userType='depot' deliveries={user.depot.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} />
            <DriverList userType='depot' drivers={user.depot.drivers} pickups={user.depot.pickups} deliveries={user.depot.deliveries} handleStatusClick={this.handleStatusClick} handleDetailsClick={this.handleDetailsClick} showDetails={this.props.showDetails} /> */}
          </Fragment>
        );
        return fragment; 
      }
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
