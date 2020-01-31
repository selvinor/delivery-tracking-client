import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
// import { SubmissionError } from 'redux-form';

export const UPDATE_DELIVERY_STATUS_REQUESTED = 'UPDATE_DELIVERY_STATUS_REQUESTED';
export const updateDeliveryStatusRequested = () => ({
  type: UPDATE_DELIVERY_STATUS_REQUESTED
});
export const UPDATE_DELIVERY_STATUS_SUCCEEDED = 'UPDATE_DELIVERY_STATUS_SUCCEEDED'; 
export const updateDeliveryStatusSucceeded = (id, userType, deliveryStatus  ) => ({
    type: UPDATE_DELIVERY_STATUS_SUCCEEDED,
    payload: {
      id:id,
      userType: userType,
      deliveryStatus: deliveryStatus
    }
});
export const UPDATE_DELIVERY_STATUS_THREW_ERROR = 'UPDATE_DELIVERY_STATUS_THREW_ERROR';
export const updateDeliveryStatusError = error => ({
  type: UPDATE_DELIVERY_STATUS_THREW_ERROR,
  error
});

export const updateDeliveryStatus = (userType, status, deliveryId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(updateDeliveryStatusRequested(userType));
  console.log('status.deliveryStatus before:', status.deliveryStatus);
  if (status.deliveryStatus === 'dispatching') {
    status.deliveryStatus = 'en route';
  } else {
    if (status.deliveryStatus === 'en route') {
      status.deliveryStatus = 'delivered';
    } else {
      status.deliveryStatus = 'dispatching';
    }
  }
  console.log('status.deliveryStatus after:', status.deliveryStatus);

  try {
    const res = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      // body: JSON.stringify(status)
      body: JSON.stringify(status)
    });
    const res_1 = normalizeResponseErrors(res);
    // const res_2 = res_1.json();
    return dispatch(updateDeliveryStatusSucceeded(deliveryId, userType, status));
  }
  catch (error) {
    dispatch(updateDeliveryStatusError(error));
  }
};