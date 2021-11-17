import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native'
import * as Location from 'expo-location'
import MapView, { Heatmap } from 'react-native-maps'
import NetInfoDisplay from '../components/NetInfoDisplay'

const MapScreen = () => {
	const [mapType, setMapType] = useState('standard')
	const [location, setLocation] = useState({ latitude: null, longitude: null })
	const [errorMsg, setErrorMsg] = useState(null)
	// const [ip, setIp] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	// const [heatmap, setHeatmap] = useState(true)
	const [points, setPoints] = useState([{ latitude: 1, longitude: 1, weight: 1 }])
	const [rec, setRec] = useState(false)
	const [asd, setAsd] = useState()

	useEffect(() => {
		(async () => {
			setIsLoading(true)
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				// setErrorMsg('Permission to access location was denied')
				return
			}
			let location = await Location.getCurrentPositionAsync({})
			// setLocation(location)
			setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude })
			console.log(location)
			setIsLoading(false)
		})()
	}, [])


	const changeMapType = () => {
		if (mapType === 'standard') {
			setMapType('satellite')
		} else if (mapType === 'satellite') {
			setMapType('standard')
		}
	}

	const recording = async () => {
		setRec(true)

		const client = await Location.watchPositionAsync({
			accuracy: Location.Accuracy.Highest,
			distanceInterval: 1,
			timeInterval: 1000,
		}, (loc) => {
			// myArray.push([{ latitude: loc.coords.latitude, longitude: loc.coords.longitude, weight: 1 }])
			let newValue = { latitude: loc.coords.latitude, longitude: loc.coords.longitude, weight: 1 }
			// myArray.push(newValue)

			setPoints(oldArray => [...oldArray, newValue])
			console.log(loc.coords.latitude, loc.coords.longitude)
			// blabla.push({ latitude: loc.coords.latitude, longitude: loc.coords.longitude, weight: 1 })

		})
		return setAsd(client)
	}
	const stop = async () => {
		setRec(false)
		console.log('Stoppad inspelning')
		console.log(points)
		// setPoints(blabla)
		// await asd.remove()
		await asd.remove()
	}

	return (
		<View style={styles.container}>
			<NetInfoDisplay />
			{isLoading ? (<ActivityIndicator style={styles.map} size='large' />) : (
				<MapView
					style={styles.map}
					showsUserLocation={true}
					showsMyLocationButton={true}
					provider='google'
					// followsUserLocation={true}
					// showsCompass={true}
					initialRegion={{
						latitude: location.latitude,
						longitude: location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
					mapType={mapType}
				>
					<Heatmap
						initialRegion={{
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
						points={points}
						radius={50}
						gradient={{
							colors: ['darkgreen', 'lightgreen', 'yellow', 'orange', 'red'],
							startPoints: [0.01, 0.04, 0.1, 0.45, 0.5],
							colorMapSize: 200
						}}
					/>
				</MapView>)}

			<View style={styles.chipView}>
				<TouchableOpacity
					style={styles.chipsItem}
					onPress={() => changeMapType()}
				>
					<Text>{mapType === 'standard' ? 'Satellit' : 'Karta'}</Text>
				</TouchableOpacity>
				{!rec ? (<TouchableOpacity style={styles.chipsItem} onPress={() => recording()}>
					<Text>Starta inspelningen</Text>
				</TouchableOpacity>) : (<TouchableOpacity style={styles.chipsItem} onPress={() => stop()}>
					<Text>Stoppa</Text>
				</TouchableOpacity>)}
				<TouchableOpacity style={styles.chipsItem} onPress={() => setPoints([])}>
					<Text>Radera</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default MapScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	chipsItem: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 8,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		height: 35,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10,
	},
	chipView: {
		flexDirection: 'row',
		position: 'absolute',
		top: Platform.OS === 'ios' ? 60 : 50,
		paddingHorizontal: 10,
	},
})
