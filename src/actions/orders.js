import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

export const FETCH_ORDER_REQUESTED = 'FETCH_ORDER_REQUESTED';
export const fetchOrderRequested = (orders) => ({
    type: FETCH_ORDER_REQUESTED
});
export const FETCH_ORDER_SUCCEEDED = 'FETCH_ORDER_SUCCEEDED';
export const fetchOrderSucceeded = (orders) => ({
    type: FETCH_ORDER_SUCCEEDED,
    orders
});
export const FETCH_ORDER_THREW_ERROR = 'FETCH_ORDER_THREW_ERROR';
export const fetchOrderError = (error) => ({
    type: FETCH_ORDER_THREW_ERROR,
    error
});
export const POST_ORDER_REQUESTED = 'POST_ORDER_REQUESTED';
export const postOrderRequested = () => ({
  type: POST_ORDER_REQUESTED
});
export const POST_ORDER_SUCCEEDED = 'POST_ORDER_SUCCEEDED'; 
export const postOrderSucceeded = (newOrder) => ({
    type: POST_ORDER_SUCCEEDED,
    newOrder
});
export const POST_ORDER_THREW_ERROR = 'POST_ORDER_THREW_ERROR';
export const postOrderError = error => ({
  type: POST_ORDER_THREW_ERROR,
  error
});
export const UPDATE_ORDER_STATUS_REQUESTED = 'UPDATE_ORDER_STATUS_REQUESTED';
export const updateOrderStatusRequested = (userType) => ({
  type: UPDATE_ORDER_STATUS_REQUESTED,
  payload: {
    userType
  }
});
export const UPDATE_ORDER_STATUS_SUCCEEDED = 'UPDATE_ORDER_STATUS_SUCCEEDED'; 
export const updateOrderStatusSucceeded = (id, userType, orderStatus, res_1  ) => ({
    type: UPDATE_ORDER_STATUS_SUCCEEDED,
    payload: {
      id:id,
      userType: userType,
      orderStatus: orderStatus
    }
});
export const UPDATE_ORDER_STATUS_THREW_ERROR = 'UPDATE_ORDER_STATUS_THREW_ERROR';
export const updateOrderStatusError = error => ({
  type: UPDATE_ORDER_STATUS_THREW_ERROR,
  error
});
export const ADD_ORDER_TO_ORDER_REQUESTED = 'ADD_ORDER_TO_ORDER_REQUESTED';
export const addOrderToOrderRequested = () => ({
    type: ADD_ORDER_TO_ORDER_REQUESTED 
    
});
export const ADD_ORDER_TO_ORDER_SUCCEEDED = 'ADD_ORDER_TO_ORDER_SUCCEEDED';
export const addOrderToOrderSucceeded = (order) => ({
    type: ADD_ORDER_TO_ORDER_SUCCEEDED, 
    payload: {
      order
    }
});
export const ADD_ORDER_TO_ORDER_THREW_ERROR = 'ADD_ORDER_TO_ORDER_THREW_ERROR';
export const addOrderToOrderError = (error) => ({
    type: ADD_ORDER_TO_ORDER_THREW_ERROR, 
    error
});
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const showLogin = () => ({
    type: SHOW_LOGIN
});


// Async actions


export const postOrder = order => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(postOrderRequested());
  return fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(order)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(postOrderSucceeded(res)))
    .catch(error => {
      const { reason, message, location } = error;
      dispatch(postOrderError(error));
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const updateOrderStatus = (userType, newStatus, orderId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log('before updateOrderStatus: ',userType, ' - ', newStatus,  '- ', orderId);
  dispatch(updateOrderStatusRequested(userType));
  if (newStatus.orderStatus === 'pending') {
    newStatus.orderStatus = 'ready';
    console.log('after updateOrderStatus: newStatus: ', newStatus);
  } else {
    if (newStatus.orderStatus === 'ready') {
      newStatus.orderStatus = 'pending';
      console.log('after updateOrderStatus: newStatus: ', newStatus);
    } else {
      newStatus.orderStatus = 'pending';
    }
  }
  
  // console.log('JSON.stringify(newStatus): ',JSON.stringify(newStatus));
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      // body: JSON.stringify(newStatus)
      body: JSON.stringify(newStatus)
    });
    const res_1 = normalizeResponseErrors(res);
    // const res_2 = res_1.json();
    // console.log('res_1: ', res_1);
    return dispatch(updateOrderStatusSucceeded(orderId, userType, newStatus, res_1));
  }
  catch (error) {
    console.log('error!: ', error);
    dispatch(updateOrderStatusError(error));
  }
};

export const deleteOrder = orderId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => {
    const { reason, message, location } = err;
    if (reason === 'ValidationError') {
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
  });
};