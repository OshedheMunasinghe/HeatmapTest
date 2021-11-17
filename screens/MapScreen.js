import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
} from 'react-native'
import MapView from 'react-native-maps'
import NetInfoDisplay from '../components/NetInfoDisplay'

const MapScreen = () => {
	const [mapType, setMapType] = useState('standard')

	const changeMapType = () => {
		if (mapType === 'standard') {
			setMapType('satellite')
		} else if (mapType === 'satellite') {
			setMapType('standard')
		}
	}

	return (
		<View style={styles.container}>
			<NetInfoDisplay />
			<MapView
				style={styles.map}
				showsUserLocation={true}
				showsMyLocationButton={true}
				// followsUserLocation={true}
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
					radius={40}
					gradient={{
						// colors: ['black', 'purple', 'red', 'yellow', 'white'],
						colors: myArray2,
						startPoints: [0.01, 0.04, 0.1, 0.45, 0.5],
						colorMapSize: 200
					}}
				></Heatmap>
			</MapView>
			<View style={styles.chipView}>
				<TouchableOpacity
					style={styles.chipsItem}
					onPress={() => changeMapType()}
				>
					<Text>{mapType === 'standard' ? 'Satellit' : 'Karta'}</Text>
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
