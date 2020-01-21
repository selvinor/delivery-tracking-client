import {
  FETCH_PICKUP_STATUS_SUCCESS,
  FETCH_PICKUP_STATUS_ERROR,
  FETCH_PICKUP_STATUS_REQUEST,
  FETCH_PICKUP_STATUS_BY_PLACEID_REQUEST,
  FETCH_PICKUP_STATUS_BY_PLACEID_ERROR,
  FETCH_PICKUP_STATUS_BY_PLACEID_SUCCESS,
  POST_PICKUP_STATUS_REQUEST,
  POST_PICKUP_STATUS_ERROR,
  POST_PICKUP_STATUS_SUCCESS,
  TOGGLE_EDIT_PICKUP_STATUS,
  EDIT_PICKUP_STATUS_REQUEST,
  EDIT_PICKUP_STATUS_ERROR,
  EDIT_PICKUP_STATUS_SUCCESS,
} from '../actions/ratings';
 
 const initialState = {
   ratings: [],
   loading: false,
   error: null,
   specificRating : null,
   editing: false
 };
 
 export default function reducer(state = initialState, action) {
   switch (action.type) {
    case FETCH_PICKUP_STATUS_REQUEST:
      return {...state, loading: true};
    case FETCH_PICKUP_STATUS_SUCCESS:
       return {...state, ratings: action.ratings, loading: false, error: null};
     case FETCH_PICKUP_STATUS_ERROR:
       return {...state, loading: false, error: action.error};
     case POST_PICKUP_STATUS_REQUEST : 
       return {...state, loading: true};
     case POST_PICKUP_STATUS_SUCCESS: 
       return {...state, loading: false};
     case POST_PICKUP_STATUS_ERROR: 
       return {...state, loading: false, error: action.error};
     case UPDATE_PICKUP_STATUS_REQUEST: 
       return {...state, loading: true};
     case UPDATE_PICKUP_STATUS_SUCCESS: 
       return {...state, loading: false};
     case UPDATE_PICKUP_STATUS_ERROR: 
       return {...state, loading: false, error: action.error}
     default: 
       return state;
   }
 }
