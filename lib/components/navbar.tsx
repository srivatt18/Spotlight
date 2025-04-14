import { TouchableOpacity, useWindowDimensions, View, Text, StyleSheet } from "react-native";
import { theme } from "../styles";
import { router } from "expo-router";

import Logo from "assets/images/logo";

export default function NavBar() {

    const { width } = useWindowDimensions();
    const isSmallScreen = width < 400;

    return (
        <View style={[styles.navBarContainer,
        isSmallScreen && { flexDirection: 'column', alignItems: 'center', gap: 12 }]}>
            <Logo size={100} />
            <View style={styles.navBar}>
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
            </View>
        </View>)
}

const styles = StyleSheet.create({
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
    navBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "fixed",
        top: 0,

        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 40,
        marginBottom: 30,
    },
});