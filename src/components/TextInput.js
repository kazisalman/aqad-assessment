import React from 'react';
import { TextInput as MTextInput, StyleSheet } from 'react-native';

const TextInput = ({ value, onChangeText, placeholder, secureTextEntry, style }) => {
  return (
    <MTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      placeholderTextColor="#999"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000000',
    backgroundColor: '#f5f5f5',
  },
});

export default TextInput;
