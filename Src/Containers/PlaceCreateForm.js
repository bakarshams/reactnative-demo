import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import { Button, Input, Spinner } from '../Components/Common';

class PlaceCreateForm extends Component {
  renderSubmitButton() {
    const { handleSubmit, isLoading } = this.props;
    if (isLoading) {
      return (
        <View style={{ minHeight: 55 }}>
          <Spinner size="small" />
        </View>
      );
    }
    return (
      <Button
        onPress={handleSubmit}
      >
        Save
      </Button>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ marginBottom: 10 }}>
        <Field
          label={'Additional Information'}
          placeholder={'Home, Office, Work etc...'}
          name='info'
          component={Input}
          keyboardType='default'
          returnKeyType={'done'}
          onSubmitEditing={handleSubmit}
          blurOnSubmit={true}
        />
        {this.renderSubmitButton()}
      </View>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.info) {
    errors.info = 'Required';
  }
  return errors;
};

PlaceCreateForm = reduxForm({ form: 'PlaceCreateForm', validate })(PlaceCreateForm);

export default PlaceCreateForm;
