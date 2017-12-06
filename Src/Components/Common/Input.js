import React from 'react';
import { TextInput, View, Text, Platform, Keyboard } from 'react-native';

const Input = (props) => {
  const { input, label, placeholder, meta, secureTextEntry, keyboardType, maxLength, returnKeyType, onSubmitEditing, autoFocus, blurOnSubmit } = props;
  const { inputStyle, labelStyle, containerStyle, errorContainerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View style={errorContainerStyle}>{renderErrors(meta)}</View>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
        placeholderTextColor={'#dcdcdc'}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        {...input}
        />
    </View>
  );
};

const renderErrors = (meta) => {
  const { errorTextStyle } = styles;
  if (meta.touched && meta.error) {
    return (
      <Text style={errorTextStyle}>{meta.error}</Text>
    );
  }
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    height: 65,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  inputStyle: {
    fontSize: 16,
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'SanFranciscoText-Regular',
    position: 'relative',
    top: (Platform.OS === 'ios') ? 2 : -4,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'SanFranciscoText-Regular',
    color: '#93949f',
    paddingLeft: (Platform.OS === 'ios') ? 0 : 5,

  },
  errorContainerStyle: {
    flex: 1
  },
  errorTextStyle: {
    paddingLeft: 20,
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'SanFranciscoText-Regular',
    paddingRight: 20,
    textAlign: 'right',
    color: 'red',
    fontSize: 10
  }
};

export { Input };