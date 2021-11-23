import React from 'react'
import { Button } from "react-native-elements";
import styles from './StopButton.styles'

const StopButton = (props) => {
  return (
    <Button
      title={'■'}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      {...props}
    />
  )
}

export default StopButton
