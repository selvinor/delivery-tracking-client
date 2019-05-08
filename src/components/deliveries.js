import React, { Fragment } from 'react';
import { connect } from 'react-redux';

export class Deliveries extends React.Component {

  componentDidMount() {
    document.title = 'Deliveries';
  }
  
  render() {

    return (
      <Fragment>
        <section id="main">
          <h2>Deliveries</h2>
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  showLogin: state.delivery.showLogin,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Deliveries);
