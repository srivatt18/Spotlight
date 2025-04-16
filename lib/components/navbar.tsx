import { TouchableOpacity, useWindowDimensions, View, Text, StyleSheet } from "react-native";
import { isPortrait, isSmallScreen, scale, theme } from "../styles";
import { router } from "expo-router";

import Logo from "@/assets/images/logo";

export default function NavBar() {

    return (
        <View style={[styles.navBar, isPortrait && { flexDirection: 'column', alignItems: 'center', gap: 12 }]}>
            <Logo size={scale(20)} />
            {([
                { label: "Home", route: "/" },
                { label: "Watchlists", route: "/watchlist" },
                { label: "Recommendations", route: "/recommendation" },
                { label: "Profile", route: "/profile" },
            ] as const).map(({ label, route }) => (
                <TouchableOpacity key={label} onPress={() => router.push(route)}>
                    <Text style={[theme.text, { marginHorizontal: 8 }]}>{label}</Text>
                </TouchableOpacity>
            ))}
        </View>)
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        //alignItems: "center",
        borderColor: "#cf4747",
        backgroundColor: "#000",
        borderBottomWidth: 1,

        width: "100%",
        padding: 12,
        paddingHorizontal: 16,
    },
});