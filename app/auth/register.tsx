// MyComponent.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Register() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.text}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

