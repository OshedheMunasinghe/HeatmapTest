import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements'
import NetInfoDisplay from '../NetInfoDisplay/NetInfoDisplay'

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

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cardView: {
    flexDirection: 'row',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal: 10
  },
  card: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
})
