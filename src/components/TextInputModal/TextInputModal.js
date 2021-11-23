import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Button, Overlay, Card, Input } from 'react-native-elements'
import { StyleSheet } from 'react-native'

const TextInputModal = (props) => {
	const toggleOverlay = () => {
		props.visible.setTextInputVisible(!props.visible.textInputVisible)
	}

	return (
		<View style={styles.cardView}>
			<Overlay
				isVisible={props.visible.textInputVisible}
				onBackdropPress={toggleOverlay}
			>
				{/* <Card style={styles.card}> */}
				<Text>Post your result </Text>
				<Input placeholder="Server address" style={styles.test} />
				<View style={styles.Button}>
					<Button title="Cancel" onPress={toggleOverlay} />
					<TouchableOpacity
						style={styles.chipsItem}
						onPress={() => console.log('Sending..')}
					>
						<Text>Send</Text>
					</TouchableOpacity>
				</View>
				{/* </Card> */}
			</Overlay>
		</View>
	)
}

const styles = StyleSheet.create({
	cardView: {
		flex: 1,
		flexDirection: 'column',
		position: 'absolute',
		top: Platform.OS === 'ios' ? 110 : 100,
		paddingHorizontal: 10,
		backgroundColor: 'green',
	},
	textStyle: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	card: {
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		padding: 20,
		marginVertical: 10,
		borderRadius: 10,
		justifyContent: 'center',
	},
	Button: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	test: {
		flex: 0,
		width: Dimensions.get('window').width - 100,
		height: Dimensions.get('window').height - 900,
	},
})
export default TextInputModal
