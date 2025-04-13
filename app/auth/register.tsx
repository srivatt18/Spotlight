import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';

import { signUp } from '../../lib/auth-client'
import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be 3 or more characters" }).refine((name) => !name.includes(' '), { message: 'Usernames must not contain spaces' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must 8 characters or longer' }).max(25, { message: 'Password must shorter than 26 characters' }),
});

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState<string | undefined>();

  function onSubmit() {
    const parse_result = registerSchema.safeParse({ username, email, password });

    if (!parse_result.success) {
      let message = parse_result.error.errors[0].message;
      setInvalid(message);
      console.log(message)
      return;
    } else {
      setInvalid(undefined)
    }

    let register_result = signUp.email(
      {
        email, // user email address
        name: username,
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

