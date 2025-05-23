import { StyleSheet, useWindowDimensions } from "react-native";

export const { width, height } = useWindowDimensions();
export const isPortrait = width < height;
export const isSmallScreen = width < 400;

export function scale(size: number) {
    return (size * (isPortrait ? height : width)) / 375;
}

export function scaleMin(size: number) {
    return (size * (isPortrait ? width : height)) / 375;
}

export function scaleHoz(size: number) {
    return (size * width) / 375;
}

export function scaleVert(size: number) {
    return (size * height) / 375;
}

export const text = StyleSheet.create({
    text: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: scale(6),
    },

    light: {
        color: "#bbb",
    },

    md: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: scale(6),
    },

    lg: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: scale(8),
    },

    xl: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: scale(10),
    },

    xxl: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: scale(12),
    },

})

export const theme = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        padding: scaleMin(15),
        alignItems: "center",
        backgroundColor: "#000",
        minHeight: "100%",
    },

    button: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: text.text.fontSize,

        backgroundColor: "#cf4747",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 20,
    },

    textInput: {
        color: "#fff",
        fontFamily: "Monomaniac One",
        fontSize: text.md.fontSize,

        padding: 4,
        backgroundColor: "#111",

        // flex: 1,
        // justifyContent: "center",
        alignItems: "center"
    },

    text: text.text,
});