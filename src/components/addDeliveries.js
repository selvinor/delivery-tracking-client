import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import AddDeliveryForm from './addDeliveryForm';
export class AddDeliveries extends React.Component {

  componentDidMount() {
    document.title = 'Add Deliveries';
  }
  
  render() {

    return (
      <Fragment>
        <section id="main">
          <AddDeliveryForm />
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  showLogin: state.delivery.showLogin,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(AddDeliveries);
