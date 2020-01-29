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
  switch (action.type) {
    case SHOW_DETAILS_CLICKED:
      let idAlreadyExists = state.showDetails.indexOf(action.payload.id) > -1;
      // make a copy of the existing array
      let showDetails = state.showDetails.slice();

      if (idAlreadyExists) {
        showDetails = showDetails.filter(id => id != action.payload.id);
      }
      else {
        // modify the COPY, not the original
        showDetails.push(action.payload);
      }

      return {
        // "spread" the original state object
        ...state,
        // but replace the "showDetails" field
        showDetails
      };

    case FETCH_PROTECTED_DATA_SUCCEEDED:
      console.log('*** FETCH_PROTECTED_DATA_SUCCEEDED ***  action.data: ', action.data);
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

      const updPickups = state.user.driver.pickups.map((pickup, index) => {
        // Find the pickup with the matching id
        if (pickup._id === action.payload.id) {
          // Return a new object
          return {
            ...pickup,
            // copy the existing pickup   
            pickupStatus: action.payload.pickupStatus.pickupStatus  // replace the pickupStatus      
          }
        }
        return pickup; // Leave every other pickup unchanged
      });
      return {
        ...state,   //copy the state (level 0)
        user: {
          ...state.user,
          driver: {
            ...state.driver, //copy level 2
            pickups: updPickups
          }
        }
      }

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
      //create a replacement set of UPDATED pickups

      const updDeliveries = state.user.driver.deliveries.map((delivery, index) => {
        // Find the pickup with the matching id
        if (delivery._id === action.payload.id) {
          // Return a new object
          return {
            ...delivery,
            // copy the existing delivery   
            deliveryStatus: action.payload.deliveryStatus.deliveryStatus  // replace the deliveryStatus      
          }
        }
        return delivery; // Leave every other delivery unchanged
      });

      return {
        ...state,   //copy the state (level 0)
        user: {
          ...state.user,
          driver: {
            ...state.driver, //copy level 2
            deliveries: updDeliveries
          }
        }
      }

    case UPDATE_DELIVERY_STATUS_THREW_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });


    case UPDATE_ORDER_STATUS_REQUESTED:
      return Object.assign({}, state, {
        loading: false,
        updating: true
      });
      
    case UPDATE_ORDER_STATUS_SUCCEEDED:
      //create a replacement set of UPDATED pickups

      const updOrders = state.user.vendor.orders.map((order, index) => {
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
          driver: {
            ...state.driver, //copy level 2
            orders: updOrders
          }
        }
      }

    case UPDATE_ORDER_STATUS_THREW_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}