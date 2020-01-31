import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

export const UPDATE_ORDER_STATUS_REQUESTED = 'UPDATE_ORDER_STATUS_REQUESTED';
export const updateOrderStatusRequested = () => ({
  type: UPDATE_ORDER_STATUS_REQUESTED
});
export const UPDATE_ORDER_STATUS_SUCCEEDED = 'UPDATE_ORDER_STATUS_SUCCEEDED'; 
export const updateOrderStatusSucceeded = (id, orderStatus  ) => ({
    type: UPDATE_ORDER_STATUS_SUCCEEDED,
    payload: {
      id:id,
      orderStatus: orderStatus
    }
});
export const UPDATE_ORDER_STATUS_THREW_ERROR = 'UPDATE_ORDER_STATUS_THREW_ERROR';
export const updateOrderStatusError = error => ({
  type: UPDATE_ORDER_STATUS_THREW_ERROR,
  error
});

export const updateOrderStatus = (userType, newStatus, orderId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(updateOrderStatusRequested(userType));
  if (newStatus.orderStatus === 'pending') {
    newStatus.orderStatus = 'ready';
  } else {
    if (newStatus.orderStatus === 'ready') {
      newStatus.orderStatus = 'pending';
    } else {
      newStatus.orderStatus = 'pending';
    }
  }
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(newStatus)
    });
    const res_1 = normalizeResponseErrors(res);
    const res_2 = res_1.json();
    return dispatch(updateOrderStatusSucceeded(orderId, newStatus));
  }
  catch (error) {
    dispatch(updateOrderStatusError(error));
  }
};