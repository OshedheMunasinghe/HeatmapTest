import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import { Heatmap } from 'react-native-maps'

const NetInfoDisplay = () => {
	const [state, setState] = useState(null)

	useEffect(() => {
		NetInfo.addEventListener((state) => {
			console.log('HELA STATE: ', state)
			setState(state)
		})
	}, [state])

	return (
		<View style={styles.container}>
			{state && (
				<View>
					<Text>BSSID: {state.details.bssid}</Text>
					<Text>Frequency: {state.details.frequency}</Text>
					<Text>Ip address: {state.details.ipAddress}</Text>
					<Text>
						Connection expensive: {String(state.details.isConnectionExpensive)}
					</Text>
					<Text>SSID: {state.details.ssid}</Text>
					<Text>Strength: {state.details.strength}</Text>
					<Text>Subnet: {state.details.subnet}</Text>

					<Text>Connected: {String(state.isConnected)}</Text>
					<Text>Internet reachable: {String(state.isInternetReachable)}</Text>
					<Text>Type: {state.type}</Text>
				</View>
			)}
		</View>
	)
}

export default NetInfoDisplay

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
})
