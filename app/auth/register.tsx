import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';

import { signUp } from "@/lib/auth-client"
import { scaleVert, theme } from '@/lib/styles';
import { registerSchema } from '@/lib/validate';
import { router } from 'expo-router';

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
        onSuccess: (ctx) => {
          console.log("register success")
          router.push("/initalrank")
        },

        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        }
      }
    );



  }

  return (
    <View style={[theme.container, {gap: scaleVert(4)}]}>
      <Text style={theme.text}>Sign-up for Spotlight!</Text>
      <Text style={[theme.text, { fontSize: 12, color: "#cf4747"}]}>{invalid ? invalid : ""}</Text>
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

