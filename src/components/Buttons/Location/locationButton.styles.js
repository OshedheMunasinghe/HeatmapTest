import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    icon: {
        flexDirection: 'row',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 760 : 750,
        left: Platform.OS === 'ios' ? 10 : 0,
        paddingHorizontal: 10,
    }
})
