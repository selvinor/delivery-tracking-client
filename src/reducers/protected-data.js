import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
    orders: [],
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
      console.log('*** FETCH_PROTECTED_DATA_SUCCESS ***  orders: ', action.data);
        return Object.assign({}, state, {
            orders: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
