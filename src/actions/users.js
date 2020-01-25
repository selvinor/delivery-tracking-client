import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config.js';
import {normalizeResponseErrors} from './utils';

export const REGISTER_SUCCEEDED = 'REGISTER_SUCCEEDED';
export const registerSucceeded = () => ({
    type: REGISTER_SUCCEEDED
});

export const REGISTER_THREW_ERROR = 'REGISTER_THREW_ERROR';
export const registerError = (err) => ({
    type: REGISTER_THREW_ERROR,
    err
});

export const REGISTER_REQUESTED = 'REGISTER_REQUESTED';
export const registerRequested = () => ({
    type: REGISTER_REQUESTED
});

export const registerUser = user => dispatch => {
    dispatch(registerRequested());
    return fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
          dispatch(registerSucceeded());
          res.json();
        })
        .catch(err => {
            const {reason, message} = err;
            dispatch(registerError(err));
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        username : message
                    })
                );
            }
        });
};

export const deleteAccount = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/api/users/${userId}`, {
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