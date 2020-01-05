import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import HeaderBar from './header-bar';
import OrderList from './order-list';
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
      // this.submitOrderForm = this.submitOrderForm.bind(this);
      }

  componentDidMount() {
    document.title = 'Dashboard';
    this.props.dispatch(fetchProtectedData());
  }

  
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  render() {
    // Only render the log out button if we are logged in
    // console.log('Logged in - this.props: ' , this.props);


    console.log('dashboard!');
    if (this.props.showWarning) {
      let stayLoggedInButton = (
        <button onClick={() => this.props.dispatch(refreshAuthToken())}>Keep me logged in</button>
      );
    }  
    let addOrderButton = (
      <button onClick={() => console.log('*** ADD ORDER ***')}>Add Order</button>
    );

    let orders = this.props.orders;
    if (orders) {
      console.log('dashboard orders: ', orders);
      return (
        <Fragment>
          <HeaderBar />
          <h1>Dashboard</h1>
            <h2>Order Pickup and Delivery Tracking</h2>
          <OrderList orders={orders}/>
        </Fragment>
      );
    }

    return ( 
      <Fragment>
        <HeaderBar />
        <OrderList orders={[]}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;

  return {
    orders: state.protectedData.orders,
    // currentUser:  state.auth.currentUser,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    showWarning: state.auth.showWarning,
    showLogin: state.order.showLogin,
    loggedIn: state.auth.currentUser !== null    
  };
};


export default connect(mapStateToProps)(Dashboard);
