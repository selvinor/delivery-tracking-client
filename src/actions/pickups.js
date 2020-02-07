import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

export const FETCH_PICKUP_REQUESTED = 'FETCH_PICKUP_REQUESTED';
export const fetchPickupRequested = (pickups) => ({
    type: FETCH_PICKUP_REQUESTED
});
export const FETCH_PICKUP_SUCCEEDED = 'FETCH_PICKUP_SUCCEEDED';
export const fetchPickupSucceeded = (pickups) => ({
    type: FETCH_PICKUP_SUCCEEDED,
    pickups
});
export const FETCH_PICKUP_THREW_ERROR = 'FETCH_PICKUP_THREW_ERROR';
export const fetchPickupError = (error) => ({
    type: FETCH_PICKUP_THREW_ERROR,
    error
});
export const POST_PICKUP_REQUESTED = 'POST_PICKUP_REQUESTED';
export const postPickupRequested = () => ({
  type: POST_PICKUP_REQUESTED
});
export const POST_PICKUP_SUCCEEDED = 'POST_PICKUP_SUCCEEDED'; 
export const postPickupSucceeded = (newPickup) => ({
    type: POST_PICKUP_SUCCEEDED,
    newPickup
});
export const POST_PICKUP_THREW_ERROR = 'POST_PICKUP_THREW_ERROR';
export const postPickupError = error => ({
  type: POST_PICKUP_THREW_ERROR,
  error
});
export const UPDATE_PICKUP_STATUS_REQUESTED = 'UPDATE_PICKUP_STATUS_REQUESTED';
export const updatePickupStatusRequested = (userType) => ({
  type: UPDATE_PICKUP_STATUS_REQUESTED,
  payload: {
    userType
  }
});
export const UPDATE_PICKUP_STATUS_SUCCEEDED = 'UPDATE_PICKUP_STATUS_SUCCEEDED'; 
export const updatePickupStatusSucceeded = (id, userType, pickupStatus  ) => ({
    type: UPDATE_PICKUP_STATUS_SUCCEEDED,
    payload: {
      id:id,
      userType: userType,
      pickupStatus: pickupStatus
    }
});
export const UPDATE_PICKUP_STATUS_THREW_ERROR = 'UPDATE_PICKUP_STATUS_THREW_ERROR';
export const updatePickupStatusError = error => ({
  type: UPDATE_PICKUP_STATUS_THREW_ERROR,
  error
});
export const ADD_ORDER_TO_PICKUP_REQUESTED = 'ADD_ORDER_TO_PICKUP_REQUESTED';
export const addOrderToPickupRequested = () => ({
    type: ADD_ORDER_TO_PICKUP_REQUESTED 
    
});
export const ADD_ORDER_TO_PICKUP_SUCCEEDED = 'ADD_ORDER_TO_PICKUP_SUCCEEDED';
export const addOrderToPickupSucceeded = (order) => ({
    type: ADD_ORDER_TO_PICKUP_SUCCEEDED, 
    payload: {
      order
    }
});
export const ADD_ORDER_TO_PICKUP_THREW_ERROR = 'ADD_ORDER_TO_PICKUP_THREW_ERROR';
export const addOrderToPickupError = (error) => ({
    type: ADD_ORDER_TO_PICKUP_THREW_ERROR, 
    error
});
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const showLogin = () => ({
    type: SHOW_LOGIN
});


// Async actions


export const postPickup = pickup => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(postPickupRequested());
  return fetch(`${API_BASE_URL}/pickups`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(pickup)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(postPickupSucceeded(res)))
    .catch(error => {
      const { reason, message, location } = error;
      dispatch(postPickupError(error));
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const updatePickupStatus = (userType, oldStatus, timestamp, pickupId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let newStatus = {'status':'pending', 'timestamp': new Date()};
  dispatch(updatePickupStatusRequested(userType));
  //console.log('before updatePickupStatus: ',userType, ' oldStatus:', oldStatus, ' timestamp:', timestamp,  '- ', pickupId);
  if (oldStatus === 'pending') {
    newStatus = {'status':'picked_up', 'timestamp': timestamp};
    //console.log('after updatePickupStatus: newStatus: ', newStatus);
  } else {
    if (oldStatus === 'picked_up') {
      newStatus = {'status':'dropped_off', 'timestamp': timestamp};
      //console.log('after updatePickupStatus: newStatus: ', newStatus);
    }
  }
  
  //console.log('JSON.stringify({pickupStatus:newStatus}): ',JSON.stringify({pickupStatus:newStatus}));
  try {
    await fetch(`${API_BASE_URL}/pickups/${pickupId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      // body: JSON.stringify(oldStatus)
      body: JSON.stringify({pickupStatus:newStatus})
    });
    // const res_1 = normalizeResponseErrors(res);
    // const res_2 = res_1.json();
    // //console.log('res_1: ', res_1);
    return dispatch(updatePickupStatusSucceeded(pickupId, userType, newStatus));
  }
  catch (error) {
    //console.log('error!: ', error);
    dispatch(updatePickupStatusError(error));
  }
};