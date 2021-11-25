import {StyleSheet} from "react-native";

export const ColorPickerStyles = StyleSheet.create({
    paletteButton: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 8,
        marginLeft: 1,
    },
    hueButton: {
        padding: 0,
        height: 32,
        borderWidth: 0,
        borderColor: "#000",
    },
    textStyle: {
        fontFamily: 'GenosR',
        fontSize: 24,
        textAlign: "center",
        color: "white"
    },
    overlayContainer: {
        width: "90%",
        backgroundColor: '#343C50',
        minHeight: "40%",
    },
    boderLineStyle: {
        top: 8,
        width: 200,
        height: 1,
        backgroundColor: 'white',
        left: 66,
        marginBottom: 30,
        opacity: 0.8
    },
    colorPickerContainer: {
        top: 20,
        minHeight: 64
    },
    hueButtonsContainer: {
        minHeight: "8%",
        bottom: 32,
        flexDirection: "row"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        top: 18
    },
    buttonStyle: {
        margin: 8,
        padding: 16
    },
    buttonFlexContainer:{
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});
