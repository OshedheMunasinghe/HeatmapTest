import React, {useEffect, useState} from "react";
import {ActivityIndicator, Platform, ToastAndroid, View} from "react-native";
import * as Location from "expo-location";
import MapView, {Heatmap} from "react-native-maps";
import SpeedOptions from "../../components/SpeedOptions/SpeedOptions";
import CardInfo from "../../components/CardInfo/CardInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputModal from "../../components/TextInputModal/TextInputModal";
import RecordButton from "../../components/Buttons/RecordButton/RecordButton";
import StopButton from "../../components/Buttons/StopButton/StopButton";
import LocationButton from "../../components/Buttons/Location/LocationButton";
import styles from "./mapScreen.styles";
import {t} from "../../language/language";

const mapStyle = require("../../styles/MapStyle/MapStyle.json");

const atHeatmapColor = "@heatmap_colors"
const standard = "standard"
const androidPhone = "android"
const googleProvider = "google"

const toastStoppedText = t('toast_stopped')
const toastRecordText = t('toast_record')

const MapScreen = ({navigation}) => {
    const [mapType, setMapType] = useState(standard);
    const [location, setLocation] = useState({latitude: null, longitude: null});
    const [isLoading, setIsLoading] = useState(true);
    const [points, setPoints] = useState([
        {latitude: 1, longitude: 1, weight: 0},
    ]);
    const [rec, setRec] = useState(false);
    const [position, setPosition] = useState();
    const [cardVisible, setCardVisible] = useState(true);
    const [textInputVisible, setTextInputVisible] = useState(false);
    const [heatmapGradient, setHeatmapGradient] = useState([
        "lightgreen",
        "lightgreen",
        "yellow",
        "orange",
        "red",
    ]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            restoreFromAsyncStorage(); // Restore saved Heatmap gradient
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            console.log(location);
            setIsLoading(false);
        })();
    }, []);

    // Restore settings from local storage
    const restoreFromAsyncStorage = async () => {
        try {
            /* Heatmap gradient colors */
            const json = await AsyncStorage.getItem(atHeatmapColor);
            if (json != null) {
                const loadedColors = JSON.parse(json);
                setHeatmapGradient(loadedColors);
            }
        } catch (e) {
            console.warn("Error restoring data from async storage");
        }
    };

    // When record button is pressed to start the recording
    const recording = async () => {
        if (Platform.OS === androidPhone) {
            ToastAndroid.show(toastRecordText, ToastAndroid.SHORT);
        }

        setRec(true);
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
                };
                setPoints((oldArray) => [...oldArray, newValue]);
            }
        );
        return setPosition(client);
    };

    // When record button is pressed to stop the recording
    const stop = async () => {
        if (Platform.OS === androidPhone) {
            ToastAndroid.show(toastStoppedText, ToastAndroid.SHORT);
        }
        setRec(false);
        await position.remove();
    };

    // Callback function when changes were made within speed dial (ie. color change)
    const onChange = () => {
        restoreFromAsyncStorage();
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.map} size="large"/>
            ) : (
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    provider={googleProvider}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    mapType={mapType}
                    customMapStyle={mapStyle}
                    ref={(mapView) => {
                        this.mapView = mapView;
                    }}
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
            <SpeedOptions
                mapTypeProps={{mapType, setMapType}}
                cardProps={{cardVisible, setCardVisible}}
                onChange={onChange}
                nav={navigation}
                textInputProp={{textInputVisible, setTextInputVisible}}
                deletePoints={{setPoints}}
            />

            <View style={styles.buttonContainer}>
                {!rec ? (
                    <RecordButton onPress={() => recording()}/>
                ) : (
                    <StopButton onPress={() => stop()}/>
                )}
            </View>

            {cardVisible ? <CardInfo/> : null}
            {textInputVisible ? (
                <TextInputModal
                    visible={{textInputVisible, setTextInputVisible}}
                    points={{points, setPoints}}
                />
            ) : null}
            <LocationButton
                onPress={() => {
                    this.mapView.animateCamera({
                        center: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        },
                    });
                }}
            />
        </View>
    );
};

export default MapScreen;
