import React from 'react'
import {View} from 'react-native'
import {Icon} from 'react-native-elements'
import {LocationButtonStyles} from './locationButton.styles'
import {ButtonStyles} from "../button.styles";

const {buttonShadow} = ButtonStyles
const {container} = LocationButtonStyles

const LocationButton = (props) => {
    return (
        <View style={container}>
            <Icon
                containerStyle={buttonShadow}
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
