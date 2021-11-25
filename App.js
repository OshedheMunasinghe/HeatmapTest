import * as React from 'react';
import {useFonts} from 'expo-font';
import MapScreen from "./src/screens/Map/MapScreen";

export default function App() {
    const [loaded] = useFonts({
        GenosB: require('./assets/Fonts/Genos-Bold.ttf'),
        GenosR: require('./assets/Fonts/Genos-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return (
        <MapScreen/>
    )
}


