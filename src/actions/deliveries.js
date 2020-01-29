import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

export const UPDATE_DELIVERY_STATUS_REQUESTED = 'UPDATE_DELIVERY_STATUS_REQUESTED';
export const updateDeliveryStatusRequested = () => ({
  type: UPDATE_DELIVERY_STATUS_REQUESTED
});
export const UPDATE_DELIVERY_STATUS_SUCCEEDED = 'UPDATE_DELIVERY_STATUS_SUCCEEDED'; 
export const updateDeliveryStatusSucceeded = (id, deliveryStatus  ) => ({
    type: UPDATE_DELIVERY_STATUS_SUCCEEDED,
    payload: {
      id:id,
      deliveryStatus: deliveryStatus
    }
});
export const UPDATE_DELIVERY_STATUS_THREW_ERROR = 'UPDATE_DELIVERY_STATUS_THREW_ERROR';
export const updateDeliveryStatusError = error => ({
  type: UPDATE_DELIVERY_STATUS_THREW_ERROR,
  error
});

export const updateDeliveryStatus = (newStatus, deliveryId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(updateDeliveryStatusRequested());
  if (newStatus.deliveryStatus === 'Dispatching') {
    newStatus.deliveryStatus = 'Out_For_Delivery';
  } else {
    if (newStatus.deliveryStatus === 'Out For Delivery') {
      newStatus.deliveryStatus = 'Delivered';
    } else {
      newStatus.deliveryStatus = 'Dispatching';
    }
  }
  try {
    const res = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      // body: JSON.stringify(newStatus)
      body: JSON.stringify(newStatus)
    });
    const res_1 = normalizeResponseErrors(res);
    const res_2 = res_1.json();
    return dispatch(updateDeliveryStatusSucceeded(deliveryId, newStatus));
  }
  catch (error) {
    dispatch(updateDeliveryStatusError(error));
  }
};