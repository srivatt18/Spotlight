
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, ScrollView, useWindowDimensions
} from "react-native";

import { useRouter } from 'expo-router';

import { theme, text } from '@/lib/styles';

const router = useRouter();

export default function WelcomeScreen() {
  return (
    <ScrollView style={{backgroundColor: "#000"}} contentContainerStyle={theme.container}>

      <Text style={[theme.text, text.xxl]}>Welcome to Spotlight!</Text>
      <Text style={[theme.text, text.xl, text.light]}>
        Our mission is to help you find movies you will love!
      </Text>

      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40, gap: 20 }}>
        <Text style={[theme.text, text.lg]}>New to Spotlight?</Text>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={theme.button}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={[theme.text, text.lg]}>Have a Spotlight account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={theme.button}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};