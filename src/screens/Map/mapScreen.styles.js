import {Dimensions, StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    speedContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 50,
        padding: 30,
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
