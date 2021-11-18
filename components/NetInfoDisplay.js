import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

const NetInfoDisplay = () => {
	NetInfo.configure({
		reachabilityUrl: 'https://clients3.google.com/generate_204',
		reachabilityTest: async (response) => response.status === 204,
		reachabilityLongTimeout: 60 * 1000, // 60s
		reachabilityShortTimeout: 1 * 1000, // 5s
		reachabilityRequestTimeout: 15 * 1000, // 15s
		reachabilityShouldRun: () => true,
	})

	const [state, setState] = useState({
		connectionStatus: false,
		connectionType: null,
		connectionReachable: false,
		connectionWifiEnabled: false,
		connectionDetails: null,
	})

	const [intervalTime, setIntervalTime] = useState(4000)
	const [randomNumber, setRandomNumber] = useState(randomSignalStrength())

	function randomSignalStrength() {
		return Math.floor(Math.random() * (99 - 65) + 65)
	}

	function unsubscribe() {
		NetInfo.fetch()
			.then((response) => {
				setState({
					connectionStatus: response.isConnected,
					connectionType: response.type,
					connectionReachable: response.isInternetReachable,
					connectionWifiEnabled: response.isWifiEnabled,
					connectionDetails: response.details,
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		unsubscribe()
		const interval = setInterval(() => {
			unsubscribe()
			setRandomNumber(randomSignalStrength())
			console.log('Fetch NetInfo every' + intervalTime + 'miliseconds')
		}, intervalTime)
		return () => clearInterval(interval)
	}, [])

	return (
		<View style={styles.container}>
			<Text>
				Connection Status :{' '}
				{state.connectionStatus ? 'Connected' : 'Disconnected'}
			</Text>
			<Text>Connection Type : {state.connectionType}</Text>
			<Text>
				Internet Reachable : {state.connectionReachable ? 'YES' : 'NO'}
			</Text>
			<Text>Wifi Enabled : {state.connectionWifiEnabled ? 'YES' : 'NO'}</Text>
			<Text>
				{'\n'}Connection Details : {'\n'}
				{state.connectionType == 'wifi'
					? (state.connectionDetails.isConnectionExpensive
							? 'Connection Expensive: YES'
							: 'Connection Expensive: NO') +
					  '\n' +
					  'SSID: ' +
					  state.connectionDetails.ssid +
					  '\n' +
					  'BSSID: ' +
					  state.connectionDetails.bssid +
					  '\n' +
					  'Strength: ' +
					  state.connectionDetails.strength +
					  '\n' +
					  'Ip Address: ' +
					  state.connectionDetails.ipAddress +
					  '\n' +
					  'Subnet: ' +
					  state.connectionDetails.subnet +
					  '\n' +
					  'Frequency: ' +
					  state.connectionDetails.frequency
					: state.connectionType == 'cellular'
					? (state.connectionDetails.isConnectionExpensive
							? 'Connection Expensive: YES'
							: 'Connection Expensive: NO') +
					  '\n' +
					  'cellularGeneration: ' +
					  state.connectionDetails.cellularGeneration +
					  '\n' +
					  'Signal Strength: ' +
					  randomNumber +
					  '\n' +
					  'carrier: ' +
					  state.connectionDetails.carrier
					: 'Check your connection'}
			</Text>
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
		flexDirection: 'column',
		padding: 10,
		margin: 20,
	},
})
