import { connect } from 'react-redux';
import axios from 'react-native-axios';

import * as ActionTypes from './ActionTypes';
import HomeScreen from '../Containers/HomeScreen';

const mapStateToProps = (state) => ({
  isLoading: state.PlaceCreateReducer.isLoading,
  error: state.PlaceCreateReducer.error,
  data: state.PlaceCreateReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  createPlaceLoading: (bool) => dispatch(createPlacePending(bool))
});

export const createPlace = (url, data) => {
  return dispatch => {
    dispatch(createPlacePending());
    axios.post(url, body)
      .then(response => {
        dispatch(createPlaceSuccess(response));
      })
      .catch(error => {
        dispatch(createPlaceError(error));
      });
  }
};

export const createPlacePending = (bool) => ({
  type: ActionTypes.PLACE_CREATE_PENDING,
  bool
});

export const createPlaceError = (error) => ({
  type: ActionTypes.PLACE_CREATE_FAILURE,
  error
});

export const createPlaceSuccess = (data) => ({
  type: ActionTypes.PLACE_CREATE_SUCCESS,
  data
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)