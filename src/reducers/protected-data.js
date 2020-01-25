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
    user: null,
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
    return state.user.driver.pickups.map((item, index) => {
      // Find the item with the matching id
      if(item.id === action.payload.id) {
        // Return a new object
        return {
          ...item,  // copy the existing item
          pickupStatus: action.payload.pickupStatus,  // replace the pickupStatus      
          updating:true  
        }
      }
  
      // Leave every other item unchanged
      return item;
    });
    case UPDATE_PICKUP_STATUS_THREW_ERROR: 
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
    default:  
      return state;
  }
}