import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCEEDED = 'FETCH_PROTECTED_DATA_SUCCEEDED';
export const fetchProtectedDataSucceeded = data => ({
    type: FETCH_PROTECTED_DATA_SUCCEEDED,
    data
});

export const FETCH_PROTECTED_DATA_THREW_ERROR = 'FETCH_PROTECTED_DATA_THREW_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_THREW_ERROR,
    error
});

export const SHOW_DETAILS_CLICKED = 'SHOW_DETAILS_CLICKED';
export const showDetailsClicked = (component, id) => ({
    type: SHOW_DETAILS_CLICKED,
    payload: {
      id: id,
      component: component
    }
});


export const fetchProtectedData = (userId) => (dispatch, getState)  => {  


  // 1) Get the logged in user's data
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/users/${userId}`, { 
    method: 'GET',
    headers: {
        // Provide our auth token as credentials  
        Authorization: `Bearer ${authToken}`
    }
})
  .then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }      
      return res.json();
  }).then(data => {
    let  user_data = data;
    let user_data_keys = Object.keys(data);   
    dispatch(fetchProtectedDataSucceeded(data));
  });
  
};
