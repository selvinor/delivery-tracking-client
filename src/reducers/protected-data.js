import {
    FETCH_PROTECTED_DATA_SUCCEEDED,
    FETCH_PROTECTED_DATA_THREW_ERROR
} from '../actions/protected-data';

import {
UPDATE_PICKUP_STATUS_REQUESTED,
UPDATE_PICKUP_STATUS_THREW_ERROR,
UPDATE_PICKUP_STATUS_SUCCEEDED,
} from '../actions/pickups';

const initialState = {
    user: {
      vendor:{
        orders:[],
        pickups:[],
        deliveries:[]
      },
      driver:{
        pickups:[],
        deliveries:[],
      },
      depot:{
        orders:[],
        pickups:[],
        deliveries:[],
        vendors:[],
        drivers:[]
      }
    },
    error: null,
    loading: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
        updating:true
      });
    case UPDATE_PICKUP_STATUS_SUCCEEDED: 
      //create a replacement set of pickup
    //   return Object.assign({}, state, {...state.user.driver.pickups.map((pickup, index) => {
    //     // Find the pickup with the matching id
    //     console.log('before: action.payload: ', action.payload);
    //     let newStatus = 'pending';
    //     if(pickup._id === action.payload.id) {

    //       // Return a new object
    //       if (action.payload.pickupStatus.pickupStatus === 'pending') {
    //         newStatus = 'pickedUp';
    //         console.log('after: newStatus: ', newStatus);
    //       } else {
    //         if (action.payload.pickupStatus.pickupStatus === 'pickedUp') {
    //           newStatus = 'droppedOff';
    //           console.log('after: newStatus: ', newStatus);
    //         }
    //       }
    //       // console.log('pickup:  ', pickup);
    //       return {
    //         ...pickup,
    //           // copy the existing pickup
    //        pickupStatus: newStatus  // replace the pickupStatus      
    //       }
    //       // Object.assign({}, state, {
    //       //   pickupStatus: action.payload.pickupStatus.pickupStatus,
    //       //   error: null
    //       // });          
    //     } 
    //     // Leave every other pickup unchanged
    //     return pickup;
    //   })
    // });
    //   console.log('newPickups: ', newPickups);
    //   return Object.assign({}, state, {
    //     user: {...state.user, ...state.user.driver, newPickups},
    //     error: false
    // });
    const updPickups = state.user.driver.pickups.map((pickup, index) => {
      // Find the pickup with the matching id
      console.log('before: action.payload: ', action.payload);
      let newStatus = 'pending';
      if(pickup._id === action.payload.id) {      
        // Return a new object
        if (action.payload.pickupStatus.pickupStatus === 'pending') {
          newStatus = 'pickedUp';
          console.log('after: newStatus: ', newStatus);
        } else {
          if (action.payload.pickupStatus.pickupStatus === 'pickedUp') {
            newStatus = 'droppedOff';
            console.log('after: newStatus: ', newStatus);
          }
        }
        console.log('pickup:  ', pickup);
        return {
          ...pickup,
            // copy the existing pickup
          pickupStatus: newStatus  // replace the pickupStatus      
        }
      }
      return pickup;
    });

    console.log('updPickups: ', updPickups);
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
    default:  
      return state;
  }
}