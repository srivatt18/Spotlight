import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';

import { signIn } from "lib/auth-client"
import { scaleVert, theme } from 'lib/styles';

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
    <View style={[theme.container, {gap: scaleVert(4)}]}>
      <Text style={theme.text}>Sign-up Screen</Text>
      
      <TextInput
        style={theme.textInput}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={theme.textInput}
        placeholder="Username"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={theme.textInput}
        placeholder="Password"
        keyboardType="email-address"
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Register!</Text>
      </Pressable>
    </View>
  );
};
