import { Pressable, Text, Image, View } from "react-native";
import { useSession, signOut } from "@/lib/auth-client"
import { theme } from "@/lib/styles";
import { router } from "expo-router";

export default function Profile() {
  let { data } = useSession();

  return (
    data != null ? (
      <View
        style={theme.container}
      >
        <Text style={theme.text}>Hello, {data.user.name}!</Text>
        <Text style={theme.text}>Welcome Back to Spotlight!</Text>
        <Text style={theme.text}>Email: {data.user.email}</Text>
        <Text style={theme.text}>Language: {data.user.lang}</Text>

      <Pressable onPress={() => {signOut(); router.push("/")}}>
              <Text style={theme.button}>Logout</Text>
            </Pressable>
      </View> 

    ) : (
      <View style={theme.container}>
        <Text style={theme.text}>User Not Logged In {data}</Text>
      </View>
    )
  );
}