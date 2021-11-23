import React, {useEffect, useState} from 'react'
import {
    ActivityIndicator,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import * as Location from 'expo-location'
import MapView, {Heatmap} from 'react-native-maps'
// import NetInfoDisplay from '../components/NetInfoDisplay'
import {Button, Card} from "react-native-elements";
import NetInfoDisplay from '../../components/NetInfoDisplay/NetInfoDisplay';
import SpeedOptions from '../../components/SpeedOptions/SpeedOptions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const mapStyle = require('../../styles/MapStyle/MapStyle.json')
const MapScreen = () => {
    const [mapType, setMapType] = useState('standard')
    const [location, setLocation] = useState({latitude: null, longitude: null})
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [points, setPoints] = useState([{latitude: 1, longitude: 1, weight: 1}])
    const [rec, setRec] = useState(false)
    const [asd, setAsd] = useState()
    const [cardVisible, setCardVisible] = useState(false)
    const [heatmapGradient, setHeatmapGradient] = useState(['lightgreen', 'lightgreen', 'yellow', 'orange', 'red'])

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            restoreFromAsyncStorage()   // Restore saved Heatmap gradient
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude})
            console.log(location)
            setIsLoading(false)
        })()
    }, [])

    const restoreFromAsyncStorage = async () => {
        try {
            /* Heatmap gradient colors */
            const json = await AsyncStorage.getItem('@heatmap_colors')
            if (json != null) {
                const loadedColors = JSON.parse(json)
                setHeatmapGradient(loadedColors)
                console.log('Restored from Async Storage')
            }
        }
        catch (e) {
            console.log ('Error restoring data from async storage')
        }
    }
    
    const saveToAsyncStorage = async () => {
        try {
            /* Heatmap gradient colors */
            await AsyncStorage.setItem('@heatmap_colors', JSON.stringify(heatmapGradient))
            console.log('Saved to Async Storage')
        }
        catch (e) {
            console.log ('Error saving data to async storage')
        }
    }
    
    const changeMapType = () => {
        if (mapType === 'standard') {
            setMapType('satellite')
        } else if (mapType === 'satellite') {
            setMapType('standard')
        }
    }

    const recording = async () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Inspelningen har startat', ToastAndroid.SHORT)
        }
        setRec(true)

        const client = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                distanceInterval: 1,
                timeInterval: 1000,
            },
            (loc) => {
                let newValue = {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    weight: 1,
                }
                setPoints((oldArray) => [...oldArray, newValue])
                console.log(loc.coords.latitude, loc.coords.longitude)
            },
        )
        return setAsd(client)
    }
    const stop = async () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Inspelningen har stoppat', ToastAndroid.SHORT)
        }
        setRec(false)
        console.log('Stoppad inspelning')
        console.log(points)
        await asd.remove()
    }

    return (
        <View style={styles.container}>
            {/*<NetInfoDisplay />*/}

            {isLoading ? (
                <ActivityIndicator style={styles.map} size="large"/>
            ) : (
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    provider="google"
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    mapType={mapType}
                    customMapStyle={mapStyle}
                >
                    <Heatmap
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        points={points}
                        radius={30}
                        gradient={{
                            colors: heatmapGradient,
                            startPoints: [0.01, 0.04, 0.1, 0.45, 0.5],
                            colorMapSize: 200,
                        }}
                    />
                </MapView>
            )}
            <SpeedOptions mapTypeProps={{mapType, setMapType}}/>
            <View style={styles.buttonContainer}>
                {!rec ? (
                    <Button
                        title={'●'}
                        buttonStyle={{
                            backgroundColor: '#D3D3D3',
                            borderRadius: 16,
                            width: 62,
                            height: 62,
                        }}
                        titleStyle={{color: 'red', fontSize: 23}}
                        onPress={() => recording()}
                    />
                ) : (
                    <Button
                        title={'■'}
                        buttonStyle={{
                            backgroundColor: '#D3D3D3',
                            borderRadius: 16,
                            width: 62,
                            height: 62,
                        }}
                        titleStyle={{color: 'green', fontSize: 23}}
                        onPress={() => stop()}
                    />
                )}
            </View>

            <View style={styles.cardView}>
                {cardVisible ? (
                    <Card containerStyle={styles.card}>
                        <Card.Title style={styles.textStyle}>Connection Details:</Card.Title>
                        <Card.Divider/>

                        <NetInfoDisplay/>

                    </Card>) : (null)}
            </View>

            <View style={styles.chipView}>
                <TouchableOpacity
                    style={styles.chipsItem}
                    onPress={() => changeMapType()}
                >
                    <Text>{mapType === 'standard' ? 'Satellit' : 'Karta'}</Text>
                </TouchableOpacity>
                {/*{!rec ? (<TouchableOpacity style={styles.chipsItem} onPress={() => recording()}>
					<Text>Starta inspelningen</Text>
				</TouchableOpacity>) : (<TouchableOpacity style={styles.chipsItem} onPress={() => stop()}>
					<Text>Stoppa</Text>
				</TouchableOpacity>)}*/}
                <TouchableOpacity style={styles.chipsItem} onPress={() => setPoints([])}>
                    <Text>Radera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        !cardVisible ? setCardVisible(true) : setCardVisible(false)
                    }}
                >
                    <Text style={styles.textStyle}>Details</Text>
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
    speedContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 50,
        padding: 30,
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
        shadowOffset: {width: 0, height: 3},
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
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 38,
        paddingHorizontal: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    cardView: {
        flexDirection: 'row',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 110 : 100,
        paddingHorizontal: 10
    },
    card: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
})
