import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Overlay, Input } from 'react-native-elements'
import styles from './TextInputModal.styles'
import axios from 'axios'

const TextInputModal = (props) => {
	const [textInput, setTextInput] = useState('')

	const handleOnChangeText = () => {
		let logs = props.visible.points

		if (textInput.length < 1) {
			ToastAndroid.show('Not a valid address', ToastAndroid.SHORT)
			return null
		}
		if (logs.length < 1) {
			ToastAndroid.show('Nothing to send', ToastAndroid.SHORT)
		} else {
			postLogs(logs)
			toggleOverlay()
		}
	}

	const postLogs = (props) => {
		ToastAndroid.show('Sending..', ToastAndroid.SHORT)
		axios
			.post(textInput, props.logs)
			.then(function (response) {
				if (response.status === 200) {
					ToastAndroid.show('Success!', ToastAndroid.SHORT)
				}
			})
			.catch(function (error) {
				console.log('Error: ', error)
				ToastAndroid.show('Something went wrong!', 30)
			})
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
				<Text>Post your result </Text>
				<Input
					placeholder="Server address"
					style={styles.inputStyle}
					value={textInput}
					onChangeText={(event) => setTextInput(event)}
				/>
				<View style={styles.button}>
					<TouchableOpacity onPress={() => handleOnChangeText()}>
						<Text>Send</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => toggleOverlay()}>
						<Text>Cancel</Text>
					</TouchableOpacity>
				</View>
			</Overlay>
		</View>
	)
}

export default TextInputModal
