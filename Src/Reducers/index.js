import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import HomeReducer from './HomeReducer';
import PlaceCreateReducer from './PlaceCreateReducer';

const AppReducer = combineReducers({
  HomeReducer,
  PlaceCreateReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  return AppReducer(state, action);
}

let store = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

export default store;