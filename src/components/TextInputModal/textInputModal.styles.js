import {Dimensions, StyleSheet} from 'react-native'
//TODO IOS PLATTFORM! make it seperate
export const TextInputModalStyles = StyleSheet.create({
    cardView: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 110 : 100,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 0,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height - 900,
        fontFamily: 'GenosR',
        top: 4,
        color: "white",
        marginTop: 18,
        fontSize: 24,
    },
    textCancelStyle: {
        fontFamily: 'GenosL',
        fontSize: 25,
        opacity: 0.8
    },
    textSendStyle: {
        fontFamily: 'GenosB',
        fontSize: 25
    },
    buttons: {
        width: 152,
        backgroundColor: "#343C50",
    },
    headerPostStyle: {
        fontFamily: 'GenosL',
        color: "white",
        left: 8,
        top: 8
    },
    buttonLineRight: {
        borderRightWidth: 1,
        borderColor: "white"
    },
    overlayStyle: {
        backgroundColor: "#343C50"
    }
})
