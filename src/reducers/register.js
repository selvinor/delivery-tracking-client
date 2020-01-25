import {
 REGISTER_SUCCEEDED,
 REGISTER_THREW_ERROR,
 REGISTER_REQUESTED
} from '../actions/users';

const initialState = {
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCEEDED:
      return {...state, loading: false};
    case REGISTER_THREW_ERROR:
      return {...state, loading: false, error: action.error};
    case REGISTER_REQUESTED:
      return {...state, loading: true};
    default: 
      return state;
  }
}
