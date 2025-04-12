// MyComponent.js
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function Register() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Sign-up Screen</Text>
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

