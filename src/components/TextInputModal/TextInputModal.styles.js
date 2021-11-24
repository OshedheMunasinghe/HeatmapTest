import {Dimensions, StyleSheet} from 'react-native'

export default StyleSheet.create({
    cardView: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 110 : 100,
        paddingHorizontal: 10,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    button: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 0,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height - 900,
    },
})
