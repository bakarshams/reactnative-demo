import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';

const Button = ({ onPress, children, style }) => {
  
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'SanFranciscoText-Regular',
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#f50',
    borderRadius: 5,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { Button };
