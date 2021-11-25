import {StyleSheet} from 'react-native'

//TODO: det behöver göras om Platform.OS kanske separera!
export const LocationButtonStyles = StyleSheet.create({
    icon: {
        flexDirection: 'row',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 760 : 750,
        left: Platform.OS === 'ios' ? 10 : 0,
        paddingHorizontal: 10,
    }
})
