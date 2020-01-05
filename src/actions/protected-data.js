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


export const fetchProtectedData = () => (dispatch, getState)  => {
  // console.log('fetch orders fired!');
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/orders`, {
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
    let  order_data = data;
    let order_data_keys = Object.keys(data);   
    console.log('***** order_data: ', order_data, '***** order_data_keys: ', order_data_keys);
    dispatch(fetchProtectedDataSuccess(data));
  });
  
  // .then(orders => {
  //     dispatch(fetchProtectedDataSuccess(orders));
  // });
};
