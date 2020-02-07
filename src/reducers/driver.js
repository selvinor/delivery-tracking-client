case UPDATE_DRIVER_STATUS_REQUESTED:
  return Object.assign({}, state, {
    loading: false,
    updating: true
  });
case UPDATE_DRIVER_STATUS_SUCCEEDED:
  //create a replacement set of UPDATED drivers
  userType = action.userType;
  //console.log('action: ', action);
  let drivers = null;
  let updDrivers = null;
  switch(action.payload.userType) {
    case  'driver':
      driver = state.user.driver;
      if (driver._id === action.payload.id) {
        // Return a new object
        return ( 
          {...driver, driverStatus: [...driverStatus, action.payload.driverStatus]}  // append the new driverStatus               
        )
      } else {
        return (
          {...driver}  // return the new pickup              
        )
      }
      return {
        ...state,   //copy the state (level 0)
        user: {
          ...state.user,
          driver: {
            ...state.user.driver, //copy level 2
             action.payload.driverStatus
          }
        }
      }
    case  'depot':
      drivers = state.user.depot.drivers;
      updDrivers = drivers.map((driver, userType,index) => {
        // Find the pickup with the matching id
        if (driver._id === action.payload.id) {
          // Return a new object
          return ( 
            {...driver, driverStatus: [...driver.driverStatus, action.payload.driverStatus]}  // append the new driverStatus               
          )
        } else {
          return (
            {...driver}  // return the new pickup              
          )
        }
      });
      return {
        ...state,   //copy the state (level 0)
        user: {
          ...state.user,
          depot: {
            ...state.user.depot, //copy level 2
            drivers: updDrivers
          }
        }
      }
    default:
      //console.log("Sorry, unknown user type ", userType);
  }
break;
case UPDATE_DRIVER_STATUS_THREW_ERROR:
  return Object.assign({}, state, {
    loading: false,
    error: true
  });

