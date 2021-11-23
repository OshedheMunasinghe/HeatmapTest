import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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