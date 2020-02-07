import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken, saveReturningUser, saveInformedUser} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const SHOW_WARNING = 'SHOW_WARNING';
export const showWarning = () => ({
    type: SHOW_WARNING
});

export const AUTH_REQUESTED = 'AUTH_REQUESTED';
export const authRequested = () => ({
    type: AUTH_REQUESTED
});

export const AUTH_SUCCEEDED = 'AUTH_SUCCEEDED';
export const authSucceeded = currentUser => ({
    type: AUTH_SUCCEEDED,
    currentUser
});

export const AUTH_THREW_ERROR = 'AUTH_THREW_ERROR';
export const authError = error => ({
    type: AUTH_THREW_ERROR,
    error
});

export const SET_RETURNING_USER = 'SET_RETURNING_USER';
export const setReturningUser = () => ({
    type: SET_RETURNING_USER
});

export const SET_INFORMED_USER = 'SET_INFORMED_USER';
export const setInformedUser = () => ({
    type: SET_INFORMED_USER
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSucceeded(decodedToken.user));
  saveAuthToken(authToken);
};

export const storeReturningUser = () => (dispatch) => {
  dispatch(setReturningUser());
  saveReturningUser();
};

export const storeInformedUser = () => (dispatch) => {
  dispatch(setInformedUser());
  saveInformedUser();
};

export const login = (username, password) => dispatch => {
  //console.log('logging in');
  dispatch(authRequested());
  return (
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    // Reject any requests which don't return a 200 status, creating
    // errors which follow a consistent format
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({authToken}) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'AuthenticationError' || reason === 'ValidationError') {
      // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
              [location] : message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
            _error: 'Your credentials are not correct'
        })
      );
    })
  );
};

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequested());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};

export const showLogoutWarning = () => (dispatch) => {
  // //console.log('dispatching 1 min left warning', Date.now());
  dispatch(showWarning());
};

