import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import { Heatmap } from 'react-native-maps'

const HomeScreen = () => {
	const [state, setState] = useState(null)
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
	let points = [{ latitude: 57.7227782, longitude: 11.7634911, weight: 100 }]

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
			setLocation(location)
		})()
	}, [])

	console.log(location)

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 57.7227782,
					longitude: 11.7634911,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Heatmap
					points={points}
					opacity={0.7}
					radius={50}
					maxIntensity={100}
					gradientSmoothing={100}
					heatmapMode={'POINTS_WEIGHT'}
					colors={{
						colors: ['red', 'lightgreen', 'yellow', 'orange', 'green'],
					}}
				/>
			</MapView>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: Dimensions.get('window').width - 30,
		height: Dimensions.get('window').height - 250,
	},
})
