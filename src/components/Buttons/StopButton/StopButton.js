import React from 'react'
import {Button} from "react-native-elements";
import {StopButtonStyles} from './stopButton.styles'
import {ButtonStyles} from "../button.styles";

const {buttonShadow} = ButtonStyles
const {button, title} = StopButtonStyles

const StopButton = (props) => {
    return (
        <Button
            title={'■'}
            containerStyle={buttonShadow}
            buttonStyle={button}
            titleStyle={title}
            {...props}
        />
    )
}

export default StopButton
