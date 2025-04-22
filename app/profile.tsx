import { Text, View } from "react-native";
import { useSession } from "@/lib/auth-client"
import { theme } from "@/lib/styles";

export default function Profile() {
  let { data } = useSession();
  return (
    data != null ? (
      <View
        style={theme.container}
      >
        <Text style={theme.text}>Hello, {data.user.name}!</Text>
      </View>

    ) : (
      <View style={theme.container}>
        <Text style={theme.text}>You aren't logged in. {data}</Text>
      </View>
    )
  );
}