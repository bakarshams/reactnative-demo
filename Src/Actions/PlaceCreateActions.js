import { connect } from 'react-redux';
import axios from 'react-native-axios';

import * as ActionTypes from './ActionTypes';
import PlaceCreateForm from '../Containers/PlaceCreateForm';

const mapStateToProps = (state) => ({
  isLoading: state.PlaceCreateReducer.isLoading,
  error: state.PlaceCreateReducer.error,
  data: state.PlaceCreateReducer.data,
});

const mapDispatchToProps = (dispatch) => ({

});



export default connect(mapStateToProps, mapDispatchToProps)(PlaceCreateForm)