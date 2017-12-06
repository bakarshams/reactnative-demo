import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
  place: null
}

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLACE:
      return Object.assign({}, state, {
        place: action.place
      });
    default:
      return state;
  }
}

export default HomeReducer;