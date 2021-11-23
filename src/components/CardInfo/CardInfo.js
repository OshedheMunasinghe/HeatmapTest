import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-elements'
import NetInfoDisplay from '../NetInfoDisplay/NetInfoDisplay'
import styles from './CardInfo.styles'

const CardInfo = () => {
  return (
    <View style={styles.cardView}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.textStyle}>Connection Details:</Card.Title>
        <Card.Divider />
        <NetInfoDisplay />
      </Card>
    </View>
  )
}

export default CardInfo
