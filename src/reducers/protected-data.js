import {
  SHOW_DETAILS_CLICKED,
  FETCH_PROTECTED_DATA_SUCCEEDED,
  FETCH_PROTECTED_DATA_THREW_ERROR
} from '../actions/protected-data';

import {
  UPDATE_PICKUP_STATUS_REQUESTED,
  UPDATE_PICKUP_STATUS_THREW_ERROR,
  UPDATE_PICKUP_STATUS_SUCCEEDED,
} from '../actions/pickups';

import {
  UPDATE_DELIVERY_STATUS_REQUESTED,
  UPDATE_DELIVERY_STATUS_THREW_ERROR,
  UPDATE_DELIVERY_STATUS_SUCCEEDED,
} from '../actions/deliveries';

// import {
//   UPDATE_DRIVER_STATUS_REQUESTED,
//   UPDATE_DRIVER_STATUS_THREW_ERROR,
//   UPDATE_DRIVER_STATUS_SUCCEEDED,
// } from '../actions/drivers';

import {
  UPDATE_ORDER_STATUS_REQUESTED,
  UPDATE_ORDER_STATUS_THREW_ERROR,
  UPDATE_ORDER_STATUS_SUCCEEDED,
} from '../actions/orders';

const initialState = {
  user: {
    vendor: {
      orders: [],
      pickups: [],
      deliveries: []
    },
    driver: {
      pickups: [],
      deliveries: [],
    },
    depot: {
      orders: [],
      pickups: [],
      deliveries: [],
      vendors: [],
      drivers: []
    }
  },
  error: null,
  loading: null,
  showDetails: []
};

export default function reducer(state = initialState, action) {
  let  userType = null;
  switch (action.type) {
    case SHOW_DETAILS_CLICKED:
      // console.log('SHOW_DETAILS_CLICKED payload: ', action.payload);
      let idAlreadyExists = state.showDetails.findIndex(detail => detail.id === action.payload.id) > -1;
      // make a copy of the existing array
      let showDetails = state.showDetails.slice();

      if (idAlreadyExists) {
        // showDetails = showDetails.filter(id => id !== action.payload.id);
        showDetails.splice(state.showDetails.findIndex(detail => detail.id === action.payload.id), 1);
      } else {
        // modify the COPY, not the original
        showDetails.push(action.payload);
      }
      // console.log('showDetails in reducer: ', showDetails);
     return {
        // "spread" the original state object
        ...state,
        // but replace the "showDetails" field
        showDetails      
      };

    case FETCH_PROTECTED_DATA_SUCCEEDED:
      return Object.assign({}, state, {
        user: action.data,
        error: null
      });
    case FETCH_PROTECTED_DATA_THREW_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });
    case UPDATE_PICKUP_STATUS_REQUESTED:
      return Object.assign({}, state, {
        loading: false,
        updating: true
      });
    case UPDATE_PICKUP_STATUS_SUCCEEDED:
      //create a replacement set of UPDATED pickups
      userType = action.userType;
      console.log('action: ', action);
      let pickups = null;
      let updPickups = null;
      switch(action.payload.userType) {
        case  'vendor':
          pickups = state.user.vendor.pickups;
          updPickups = pickups.map((pickup, userType,index) => {
            // Find the pickup with the matching id
            if (pickup._id === action.payload.id) {
              // Return a new object
              return ( 
                {...pickup, pickupStatus: [...pickup.pickupStatus, action.payload.pickupStatus]}  // append the new pickupStatus               
              )
            } else {
              return (
                {...pickup}  // return the new pickup              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              vendor: {
                ...state.user.vendor, //copy level 2
                pickups: updPickups
              }
            }
          }
        case  'driver':
          pickups = state.user.driver.pickups;
          updPickups = pickups.map((pickup, userType,index) => {
            // Find the pickup with the matching id
            if (pickup._id === action.payload.id) {
              // Return a new object
              return ( 
                {...pickup, pickupStatus: [...pickup.pickupStatus, action.payload.pickupStatus]}  // append the new pickupStatus               
              )
            } else {  
              return (
                {...pickup}  // return the new pickup              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              driver: {
                ...state.user.driver, //copy level 2
                pickups: updPickups
              }
            }
          }
        case  'depot':
          pickups = state.user.depot.pickups;
          console.log('reducer action.payload: ', action.payload );
          updPickups = pickups.map((pickup, userType,index) => {
            // Find the pickup with the matching id
            if (pickup._id === action.payload.id) {
              // Return a new object
              return ( 
                {...pickup, pickupStatus: [...pickup.pickupStatus, action.payload.pickupStatus]}  // append the new pickupStatus               
              )
            } else {
              return (
                {...pickup}  // return the new pickup              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              depot: {
                ...state.user.depot, //copy level 2
                pickups: updPickups
              }
            }
          }
        default:
          console.log("Sorry, unknown user type ", userType);
      }
    break;
    case UPDATE_PICKUP_STATUS_THREW_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });


    case UPDATE_DELIVERY_STATUS_REQUESTED:
      return Object.assign({}, state, {
        loading: false,
        updating: true
      });
    case UPDATE_DELIVERY_STATUS_SUCCEEDED:
      //create a replacement set of UPDATED deliveries
      userType = action.userType;
      console.log('action: ', action);
      let deliveries = null;
      let updDeliveries = null;
      switch(action.payload.userType) {
        case  'vendor':
          deliveries = state.user.vendor.deliveries;
          updDeliveries = deliveries.map((delivery, userType,index) => {
            // Find the delivery with the matching id
            if (delivery._id === action.payload.id) {
              // Return a new object
              return ( 
                {...delivery, deliveryStatus: [...delivery.deliveryStatus, action.payload.deliveryStatus]}  // append the new deliveryStatus               
              )
            } else {
              return (
                {...delivery}  // return the new delivery              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              vendor: {
                ...state.user.vendor, //copy level 2
                pickups: updPickups
              }
            }
          }
        case  'driver':
          deliveries = state.user.driver.deliveries;
          updDeliveries = deliveries.map((delivery, userType,index) => {
            // Find the pickup with the matching id
            if (delivery._id === action.payload.id) {
              // Return a new object
              return ( 
                {...delivery, deliveryStatus: [...delivery.deliveryStatus, action.payload.deliveryStatus]}  // append the new deliveryStatus               
              )
            } else {
              return (
                {...delivery}  // return the new pickup              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              driver: {
                ...state.user.driver, //copy level 2
                pickups: updPickups
              }
            }
          }
          case  'depot':
            deliveries = state.user.depot.deliveries;
            console.log('reducer action.payload: ', action.payload );
            updDeliveries = deliveries.map((delivery, userType,index) => {
              // Find the delivery with the matching id
              if (delivery._id === action.payload.id) {
                // Return a new object
                return ( 
                  {...delivery, deliveryStatus: [...delivery.deliveryStatus, action.payload.deliveryStatus]}  // append the new deliveryStatus               
                )
              } else {
                return (
                  {...delivery}  // return the new delivery              
                )
              }
            });
            return {
              ...state,   //copy the state (level 0)
              user: {
                ...state.user,
                depot: {
                  ...state.user.depot, //copy level 2
                  deliveries: updDeliveries
                }
              }
            }
          default:
            console.log("Sorry, unknown user type ", userType);
        }
      break;
      case UPDATE_PICKUP_STATUS_THREW_ERROR:
      case UPDATE_DELIVERY_STATUS_THREW_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });

// case UPDATE_DRIVER_STATUS_REQUESTED:
//   return Object.assign({}, state, {
//     loading: false,
//     updating: true
//   });
// case UPDATE_DRIVER_STATUS_SUCCEEDED:
//   //create a replacement set of UPDATED drivers
//   userType = action.userType;
//   console.log('action: ', action);
//   let drivers = null;
//   let updDrivers = null;
//   switch(action.payload.userType) {
//     case  'driver':
//       driver = state.user.driver;
//       if (driver._id === action.payload.id) {
//         // Return a new object
//         return ( 
//           {...driver, driver.driverStatus: [...driverStatus, action.payload.driverStatus]}  // append the new driverStatus               
//         )
//       } else {
//         return (
//           {...driver}  // return the new pickup              
//         )
//       }
//       return {
//         ...state,   //copy the state (level 0)
//         user: {
//           ...state.user,
//           driver: {
//             ...state.user.driver, //copy level 2
//             driverStatus: action.payload.driverStatus
//           }
//         }
//       }
//     case  'depot':
//       drivers = state.user.depot.drivers;
//       updDrivers = drivers.map((driver, userType,index) => {
//         // Find the pickup with the matching id
//         if (driver._id === action.payload.id) {
//           // Return a new object
//           return ( 
//             {...driver, driverStatus: [...driver.driverStatus, action.payload.driverStatus]}  // append the new driverStatus               
//           )
//         } else {
//           return (
//             {...driver}  // return the new pickup              
//           )
//         }
//       });
//       return {
//         ...state,   //copy the state (level 0)
//         user: {
//           ...state.user,
//           depot: {
//             ...state.user.depot, //copy level 2
//             drivers: updDrivers
//           }
//         }
//       }
//     default:
//       console.log("Sorry, unknown user type ", userType);
//   }
// break;
// case UPDATE_DRIVER_STATUS_THREW_ERROR:
//   return Object.assign({}, state, {
//     loading: false,
//     error: true
//   });

    case UPDATE_ORDER_STATUS_REQUESTED:
      return Object.assign({}, state, {
        loading: false,
        updating: true
      });
      
    case UPDATE_ORDER_STATUS_SUCCEEDED:
      //create a replacement set of UPDATED pickups
      userType = action.userType;
      console.log('action: ', action);
      let orders = null;
      let updOrders = null;
      switch(action.payload.userType) {
        case  'vendor':
          orders = state.user.vendor.orders;
          updOrders = orders.map((order, userType,index) => {
            // Find the pickup with the matching id
            if (order._id === action.payload.id) {
              // Return a new object
              return ( 
                {...order, deliveryStatus: [...order.orderStatus, action.payload.orderStatus]}  // append the new deliveryStatus               
              )
            } else {
              return (
                {...order}  // return the new pickup              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              vendor: {
                ...state.user.vendor, //copy level 2
                pickups: updOrders
              }
            }
          }
        case  'driver':
          orders = state.user.driver.orders;
          updOrders = orders.map((order, userType,index) => {
            // Find the pickup with the matching id
            if (order._id === action.payload.id) {
              // Return a new object
              return ( 
                {...order, deliveryStatus: [...order.orderStatus, action.payload.orderStatus]}  // append the new deliveryStatus               
              )
            } else {
              return (
                {...order}  // return the new pickup              
              )
            }
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              driver: {
                ...state.user.driver, //copy level 2
                pickups: updOrders
              }
            }
          }
        case  'depot':
          orders = state.user.depot.orders;
          updPickups = orders.map((order, userType,index) => {
            // Find the order with the matching id
            if (order._id === action.payload.id) {
              // Return a new object
              return {
                ...order,
                // copy the existing order   
                orderStatus: action.payload.orderStatus.orderStatus  // replace the orderStatus      
              }
            }
            return order; // Leave every other order unchanged
          });
          return {
            ...state,   //copy the state (level 0)
            user: {
              ...state.user,
              depot: {
                ...state.user.depot, //copy level 2
                orders: updOrders
              }
            }
          }
        default:
          console.log("Sorry, unknown user type ", userType);
      }
    break;
    case UPDATE_ORDER_STATUS_THREW_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}