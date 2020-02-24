import React, { Fragment } from 'react';


const DriverBasic = (props) => {
  //console.log('DriverBasic props',props);
    return (
      <Fragment>
        <div>
        <p className="big bold reverse top center"># Pickups</p>
        <p className="bold center">{props.pickups.length}</p>
        </div>
        <div>
        <p className="big bold reverse top center"># Deliveries</p>
        <p className="bold center">{props.deliveries.length}</p>
        </div>
      </Fragment>
    );
  };
export default DriverBasic;