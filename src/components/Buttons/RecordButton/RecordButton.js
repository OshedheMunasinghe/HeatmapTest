import React from 'react'
import {Button} from "react-native-elements";
import styles from './RecordButton.styles'

const RecordButton = (props) => {
    return (
        <Button
            title={'●'}
            buttonStyle={styles.button}
            titleStyle={styles.title}
            {...props}
        />
    )
}

export default RecordButton
