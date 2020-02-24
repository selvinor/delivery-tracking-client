import { API_BASE_URL } from '../config';
// import { normalizeResponseErrors } from './utils';
// import { SubmissionError } from 'redux-form';

export const UPDATE_DELIVERY_STATUS_REQUESTED = 'UPDATE_DELIVERY_STATUS_REQUESTED';
export const updateDeliveryStatusRequested = (userType) => ({
  type: UPDATE_DELIVERY_STATUS_REQUESTED,
  payload: {
    userType
  }
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

export const updateDeliveryStatus = (userType, oldStatus, timestamp, deliveryId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let newStatus = {'status':'dispatching', 'timestamp': new Date()};
  dispatch(updateDeliveryStatusRequested(userType));
  //console.log('before updatePickupStatus: ',userType, ' oldStatus:', oldStatus, ' timestamp:', timestamp,  '- ', deliveryId);
  if (oldStatus === 'dispatching') {
    newStatus = {'status':'en route', 'timestamp': timestamp};
    //console.log('after updateDeliveryStatus: newStatus: ', newStatus);
  } else {
    if (oldStatus === 'en route') {
      newStatus = {'status':'delivered', 'timestamp': timestamp};
      //console.log('after updateDeliveryStatus: newStatus: ', newStatus);
    }
  }
  
  //console.log('JSON.stringify({deliveryStatus:newStatus}): ',JSON.stringify({deliveryStatus:newStatus}));
  try {
    await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      // body: JSON.stringify(oldStatus)
      body: JSON.stringify({deliveryStatus:newStatus})
    });
    // const res_1 = normalizeResponseErrors(res);
    // const res_2 = res_1.json();
    // //console.log('res_1: ', res_1);
    return dispatch(updateDeliveryStatusSucceeded(deliveryId, userType, newStatus));
  }
  catch (error) {
    dispatch(updateDeliveryStatusError(error));
  }
};