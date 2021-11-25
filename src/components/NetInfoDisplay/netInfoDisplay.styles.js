import {Platform, StyleSheet} from 'react-native'

export const NetInfoDisplayStyles = StyleSheet.create({
    container: {
        backgroundColor: "#070C17",
        position: 'absolute',
        borderRadius: 8,
        top: 50,
        width: 258,
        height: 288,
        opacity: 0.8
    },
    containeriOS: {
        top: Platform.OS === 'ios' ? 60 : 50,
    },
    textStyleDetail: {
        color: 'white',
        fontFamily: "GenosR",
        fontSize: 18,
        textAlign: "left",
        top: 18,
        paddingLeft: 28
    },
    borderLine: {
        backgroundColor: "white",
        width: 220,
        height: 2,
        left: 22,
        top: -8,
        opacity: 0.8
    }

})
