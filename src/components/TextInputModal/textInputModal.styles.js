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
