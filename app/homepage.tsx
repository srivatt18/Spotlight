
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView, Image
} from "react-native";
import { useRouter } from 'expo-router';
import Logo from '../assets/images/logo';
import { useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { logoGradient } from '../assets/constants/gradient'; 



//const { width } = Dimensions.get("window");
const { width } = useWindowDimensions();
const isSmallScreen = width < 400;
const router = useRouter();



export const WelcomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.navBarContainer,
    isSmallScreen && { flexDirection: 'column', alignItems: 'center', gap: 12 }]}>
      <Logo size={100} />
      <View style={styles.navBar}>
        {([
            { label: "Home", route: "/homepage" },
            { label: "Watchlists", route: "/watchlist" },
            { label: "Recommendations", route: "/recommendation" },
            { label: "Profile", route: "/profile" },
          ]as const).map(({ label, route }) => (
            <TouchableOpacity key={label} onPress={() => router.push(route)}>
              <Text style={styles.navItem}>{label}</Text>
            </TouchableOpacity>
        ))}
      </View>
      </View>

      <Text style={styles.welcome}>Welcome to Spotlight!</Text>
      <Text style={styles.mission}>
        Our mission is to help you find shows and movies you will love!
      </Text>

      <View style={styles.accountOptions}>
        <Text style={styles.label}>New to Spotlight?</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/register')}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Have a Spotlight account?</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const scaleFont = (size: number) => (size * width) / 375;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 18,
    minHeight: "100%",
  },
  ellipse1: {
    position: "absolute",
    top: -50,
    left: -50,
  },
  welcome: {
    fontSize: scaleFont(28),
    color: "#fff",
    fontFamily: "Monomaniac One",
    marginTop: 10,
    textAlign: "center",
  },
  mission: {
    fontSize: scaleFont(16),
    color: "#ccc",
    fontFamily: "PlusJakartaSans",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: scaleFont(14),
    color: "#fff",
    fontFamily: "Monomaniac One",
    marginBottom: 8,
  },
  accountOptions: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    gap: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#cf4747",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PlusJakartaSans",
    fontSize: 16,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    //alignItems: "center",
    borderColor: "#cf4747",
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
    padding: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 12,
    marginBottom: 30,
  },
  navItem: {
    color: "#fff",
    fontFamily: "PlusJakartaSans",
    fontSize: 28,
    marginHorizontal: 8
  },

  navBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 30,
  },
});
export default WelcomeScreen;

