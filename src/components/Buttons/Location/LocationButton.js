import React from 'react'
import {View} from 'react-native'
import {Icon} from 'react-native-elements'
import styles from './locationButton.styles'

const LocationButton = (props) => {
    return (
        <View style={styles.icon}>
            <Icon
                raised
                name="my-location"
                type="material"
                color="black"
                {...props}
            />
        </View>
    )
}

export default LocationButton
