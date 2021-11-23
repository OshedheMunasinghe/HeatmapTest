import React, { useState } from 'react'
import { render } from 'react-dom'
import { StyleSheet } from 'react-native'
import { SpeedDial } from 'react-native-elements'
import TextInputModal from '../TextInputModal/TextInputModal'

const SpeedOptions = (props) => {
	const [open, setOpen] = useState(false)

	const changeMapType = () => {
		if (props.speedOptionProps.mapType === 'standard') {
			props.speedOptionProps.setMapType('satellite')
		} else if (props.speedOptionProps.mapType === 'satellite') {
			props.speedOptionProps.setMapType('standard')
		}
	}

	const showTextInput = () => {
		console.log('Show text input', props.speedOptionProps.TextInputModal)
		return props.speedOptionProps.setTextInputVisible(
			!props.speedOptionProps.TextInputModal,
		)
	}

	return (
		<SpeedDial
			color="#D3D3D3"
			style={styles.speedContainer}
			isOpen={open}
			icon={{ name: 'edit', color: 'black' }}
			openIcon={{ name: 'close', color: 'black' }}
			onOpen={() => setOpen(!open)}
			onClose={() => setOpen(!open)}
		>
			<SpeedDial.Action
				titleStyle={{ fontFamily: 'GenosR' }}
				color="#D3D3D3"
				icon={{ name: 'map', color: 'black' }}
				title="Dashboard"
				onPress={() => alert('-- Dashboard --')}
			/>
			<SpeedDial.Action
				color="#D3D3D3"
				icon={{ name: 'dashboard', color: 'black' }}
				title={
					props.speedOptionProps.mapType === 'standard' ? 'Satellit' : 'Karta'
				}
				onPress={() => changeMapType(props)}
			/>
			<SpeedDial.Action
				color="#D3D3D3"
				icon={{ name: 'settings', color: 'black' }}
				title="Heatmap Colors"
				onPress={() => alert('-- Color Picker --')}
			/>
			<SpeedDial.Action
				color="#D3D3D3"
				icon={{ name: 'send', color: 'black' }}
				title="Send to server"
				onPress={() => {
					showTextInput()
				}}
			/>
		</SpeedDial>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		bottom: 38,
		paddingHorizontal: 10,
	},
	speedContainer: {
		marginBottom: 23,
	},
})
export default SpeedOptions
