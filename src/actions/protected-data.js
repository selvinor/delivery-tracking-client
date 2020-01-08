import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
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
        // console.log('!!!PROBLEM!!!');
          return Promise.reject(res.statusText);
      }      
      return res.json();
  }).then(data => {
    let  user_data = data;
    let user_data_keys = Object.keys(data);   
    console.log('***** user_data: ', user_data, '***** user_data_keys: ', user_data_keys);
    dispatch(fetchProtectedDataSuccess(data));
  });
  
  // .then(orders => {
  //     dispatch(fetchProtectedDataSuccess(orders));
  // });
};
