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

export default function WatchlistPage() {
  return (
    <ScrollView style={{backgroundColor: "#000"}} contentContainerStyle={theme.container}>



      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40, gap: 20 }}>
        <Text style={[theme.text, text.lg]}>New Watchlist</Text>

        <TouchableOpacity onPress={() => router.push('/createwatchlist')}>
          <Text style={theme.button}>Create</Text>
        </TouchableOpacity>

        <Text style={[theme.text, text.lg]}>View/Edit Watchlist</Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={theme.button}>View</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
