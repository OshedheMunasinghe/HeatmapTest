import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import { Heatmap } from 'react-native-maps'

const HomeScreen = () => {
	const [state, setState] = useState()
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
	let points = [{ latitude: 57.7227782, longitude: 11.7634911, weight: 100 }]

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			console.log('Connection type', state.type)
			console.log('Is connected?', state.isConnected)
			console.log('HELA STATE: ', state)
			setState(state)
		})
	}, [state?.strength])

	return (
		<View style={styles.container}>
			{state && (
				<View>
					<Text>BSSID: {state.details.bssid}</Text>
					<Text>Frequency: {state.details.frequency}</Text>
					<Text>Ip address: {state.details.ipAddress}</Text>
					<Text>
						ConnectionExpensive: {String(state.details.isConnectionExpensive)}
					</Text>
					<Text>SSID: {state.details.ssid}</Text>
					<Text>Strength: {state.details.strength}</Text>
					<Text>Subnet: {state.details.subnet}</Text>

					<Text>Connected: {String(state.isConnected)}</Text>
					<Text>InternetReachable: {String(state.isInternetReachable)}</Text>
				</View>
			)}
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	map: {
		width: Dimensions.get('window').width - 30,
		height: Dimensions.get('window').height - 250,
	},
})
