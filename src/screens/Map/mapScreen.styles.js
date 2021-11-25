import {Dimensions, StyleSheet} from 'react-native'

export const MapScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    buttonContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 38,
        paddingHorizontal: 10,
    }
})
