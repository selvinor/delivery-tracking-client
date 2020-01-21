import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

export const FETCH_PICKUP_REQUEST = 'FETCH_PICKUP_REQUEST';
export const fetchPickupRequest = (pickups) => ({
    type: FETCH_PICKUP_REQUEST
});
export const FETCH_PICKUP_SUCCESS = 'FETCH_PICKUP_SUCCESS';
export const fetchPickupSuccess = (pickups) => ({
    type: FETCH_PICKUP_SUCCESS,
    pickups
});
export const FETCH_PICKUP_ERROR = 'FETCH_PICKUP_ERROR';
export const fetchPickupError = (error) => ({
    type: FETCH_PICKUP_ERROR,
    error
});
export const POST_PICKUP_REQUEST = 'POST_PICKUP_REQUEST';
export const postPickupRequest = () => ({
  type: POST_PICKUP_REQUEST
});
export const POST_PICKUP_SUCCESS = 'POST_PICKUP_SUCCESS'; 
export const postPickupSuccess = (newPickup) => ({
    type: POST_PICKUP_SUCCESS,
    newPickup
});
export const POST_PICKUP_ERROR = 'POST_PICKUP_ERROR';
export const postPickupError = error => ({
  type: POST_PICKUP_ERROR,
  error
});
export const UPDATE_PICKUP_STATUS_REQUEST = 'UPDATE_PICKUP_STATUS_REQUEST';
export const updatePickupStatusRequest = () => ({
  type: UPDATE_PICKUP_STATUS_REQUEST
});
export const UPDATE_PICKUP_STATUS_SUCCESS = 'UPDATE_PICKUP_STATUS_SUCCESS'; 
export const updatePickupStatusSuccess = (newPickup) => ({
    type: UPDATE_PICKUP_STATUS_SUCCESS,
    newPickup
});
export const UPDATE_PICKUP_STATUS_ERROR = 'UPDATE_PICKUP_STATUS_ERROR';
export const updatePickupStatusError = error => ({
  type: UPDATE_PICKUP_STATUS_ERROR,
  error
});
export const ADD_ORDER_TO_PICKUP_REQUEST = 'ADD_ORDER_TO_PICKUP_REQUEST';
export const addOrderToPickupRequest = () => ({
    type: ADD_ORDER_TO_PICKUP_REQUEST 
    
});
export const ADD_ORDER_TO_PICKUP_SUCCESS = 'ADD_ORDER_TO_PICKUP_SUCCESS';
export const addOrderToPickupSuccess = (order) => ({
    type: ADD_ORDER_TO_PICKUP_SUCCESS, 
    order
});
export const ADD_ORDER_TO_PICKUP_ERROR = 'ADD_ORDER_TO_PICKUP_ERROR';
export const addOrderToPickupError = (error) => ({
    type: ADD_ORDER_TO_PICKUP_ERROR, 
    error
});
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const showLogin = () => ({
    type: SHOW_LOGIN
});


// Async actions


export const postPickup = pickup => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(postPickupRequest());
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
    .then(res => dispatch(postPickupSuccess(res)))
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

export const updatePickupStatus = (newStatus, pickupId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(updatePickupStatusRequest());
  console.log('JSON.stringify(newStatus): ',JSON.stringify(newStatus));
  try {
    const res = await fetch(`${API_BASE_URL}/pickups/${pickupId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(newStatus)
    });
    const res_1 = normalizeResponseErrors(res);
    const res_2 = res_1.json();
    return dispatch(updatePickupStatusSuccess(res_2));
  }
  catch (error) {
    dispatch(updatePickupStatusError(error));
  }
};