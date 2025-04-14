import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';

import { signIn } from "lib/auth-client"

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    let register_result = signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        }
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text>Sign-up Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text>{invalid ? invalid : ""}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="email-address"
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={onSubmit}>
        <Text>Register!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

