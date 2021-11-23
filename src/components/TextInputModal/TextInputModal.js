import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ToastAndroid,
} from 'react-native'
import React, { useState } from 'react'
import { Button, Overlay, Input } from 'react-native-elements'
import { StyleSheet } from 'react-native'

const TextInputModal = (props) => {
	const [textInput, setTextInput] = useState('')

	const handleOnChangeText = () => {
		console.log('Handle on change text')
		if (textInput.length < 1) {
			ToastAndroid.show('Not a valid address', ToastAndroid.SHORT)
			return null
		}
	}

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
				<Input
					placeholder="Server address"
					style={styles.test}
					value={textInput}
					onChangeText={(event) => setTextInput(event)}
				/>
				<View style={styles.Button}>
					<Button title="Cancel" onPress={toggleOverlay} />
					<TouchableOpacity
						style={styles.chipsItem}
						onPress={() => handleOnChangeText()}
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
