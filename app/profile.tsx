import { Text, View } from "react-native";
import { useSession } from "@/lib/auth-client";
import { theme, text } from "@/lib/styles";

export default function Profile() {
  const { data } = useSession();

  if (!data?.user) {
    return (
      <View style={theme.container}>
        <Text style={theme.text}>You aren't logged in.</Text>
      </View>
    );
  }

  const { name, email } = data.user;

  return (
    <View style={theme.container}>
      <Text style={[theme.text, text.xl]}>Hello, {name}!</Text>
      <Text style={[theme.text, text.md]}>Email: {email}</Text>
    </View>
  );
}
