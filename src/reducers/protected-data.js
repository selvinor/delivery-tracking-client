import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
    user: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
      console.log('*** FETCH_PROTECTED_DATA_SUCCESS ***  user: ', action.data);
        return Object.assign({}, state, {
            user: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
