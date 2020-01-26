import {
  FETCH_PICKUP_STATUS_SUCCEEDED,
  FETCH_PICKUP_STATUS_THREW_ERROR,
  FETCH_PICKUP_STATUS_REQUESTED,
  POST_PICKUP_STATUS_REQUESTED,
  POST_PICKUP_STATUS_THREW_ERROR,
  POST_PICKUP_STATUS_SUCCEEDED

} from '../actions/pickups';
 
 const initialState = {
   pickups: [],
   loading: false,
   error: null,
   specificRating : null,
   editing: false
 };
 
 export default function reducer(state = initialState, action) {
   switch (action.type) {
    case FETCH_PICKUP_STATUS_REQUESTED:
      return {...state, loading: true};
    case FETCH_PICKUP_STATUS_SUCCEEDED:
       return {...state, pickups: action.pickups, loading: false, error: null};
     case FETCH_PICKUP_STATUS_THREW_ERROR:
       return {...state, loading: false, error: action.error};
     case POST_PICKUP_STATUS_REQUESTED : 
       return {...state, loading: true};
     case POST_PICKUP_STATUS_SUCCEEDED: 
       return {...state, loading: false};
     case POST_PICKUP_STATUS_THREW_ERROR: 
       return {...state, loading: false, error: action.error};
     default: 
       return state;
   }
 }
