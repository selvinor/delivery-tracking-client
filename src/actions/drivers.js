import { API_BASE_URL } from '../config';
// import { normalizeResponseErrors } from './utils';
// import { SubmissionError } from 'redux-form';

export const UPDATE_DRIVER_STATUS_REQUESTED = 'UPDATE_DRIVER_STATUS_REQUESTED';
export const updateDriverStatusRequested = (userType) => ({
  type: UPDATE_DRIVER_STATUS_REQUESTED,
  payload: {
    userType
  }
});
export const UPDATE_DRIVER_STATUS_SUCCEEDED = 'UPDATE_DRIVER_STATUS_SUCCEEDED';
export const updateDriverStatusSucceeded = (id, userType, driverStatus) => ({
  type: UPDATE_DRIVER_STATUS_SUCCEEDED,
  payload: {
    id: id,
    userType: userType,
    driverStatus: driverStatus
  }
});
export const UPDATE_DRIVER_STATUS_THREW_ERROR = 'UPDATE_DRIVER_STATUS_THREW_ERROR';
export const updateDriverStatusError = error => ({
  type: UPDATE_DRIVER_STATUS_THREW_ERROR,
  error
});

export const updateDriverStatus = (userType, oldStatus, timestamp, driverId) => async (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let newStatus = { 'status': 'dispatching', 'timestamp': new Date() };
  dispatch(updateDriverStatusRequested(userType));
  //console.log('before updatePickupStatus: ',userType, ' oldStatus:', oldStatus, ' timestamp:', timestamp,  '- ', driverId);
  if (oldStatus === 'waiting') {
    newStatus = { 'status': 'picking up', 'timestamp': timestamp };
    //console.log('after updateDriverStatus: newStatus: ', newStatus);
  } else {
    if (oldStatus === 'out for pickup') {
      newStatus = { 'status': 'dropping off to depot', 'timestamp': timestamp };
      //console.log('after updateDriverStatus: newStatus: ', newStatus);
    } else {
      if (oldStatus === 'dropping off to depot') {
        newStatus = { 'status': 'out for delivery', 'timestamp': timestamp };
        //console.log('after updateDriverStatus: newStatus: ', newStatus);
      } else {
        if (oldStatus === 'out for delivery') {
          newStatus = { 'status': 'waiting', 'timestamp': timestamp };
          //console.log('after updateDriverStatus: newStatus: ', newStatus);
        }
      }
    }
  }
  try {
    await fetch(`${API_BASE_URL}/drivers/${driverId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      // body: JSON.stringify(oldStatus)
      body: JSON.stringify({ driverStatus: newStatus })
    });
    // const res_1 = normalizeResponseErrors(res);
    // const res_2 = res_1.json();
    // //console.log('res_1: ', res_1);
    return dispatch(updateDriverStatusSucceeded(driverId, userType, newStatus));
  }
  catch (error) {
    dispatch(updateDriverStatusError(error));
  }
};