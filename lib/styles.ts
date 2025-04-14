import { StyleSheet, useWindowDimensions } from "react-native";

const { width, height } = useWindowDimensions();
export const isSmallScreen = width < 400;

function scale(size: number) {
    return (size * width) / 375;
}

export const text = StyleSheet.create({
    text: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: 28,
    },

    light: {
        color: "#bbb",
    },

    md: {
        fontSize: scale(6),
    },

    lg: {
        fontSize: scale(8),
    },

    xl: {
        fontSize: scale(10),
    },

    xxl: {
        fontSize: scale(12),
    },

})

export const theme = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        padding: 18,
        minHeight: "100%",
    },

    button: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: text.md.fontSize,

        backgroundColor: "#cf4747",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 20,
    },

    textInput: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    text: text.text,
});