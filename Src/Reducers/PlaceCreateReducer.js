import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
  isLoading: false,
  error: undefined,
  data: {}
}

const PlaceCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PLACE_CREATE_PENDING:
      return Object.assign({}, state, {
        isLoading: action.bool
      });
    case ActionTypes.PLACE_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.data
      });
    case ActionTypes.PLACE_CREATE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default PlaceCreateReducer;