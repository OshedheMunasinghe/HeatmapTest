import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from "./src/screens/Settings/SettingScreen";
import MapScreen from "./src/screens/Map/MapScreen";
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        GenosB: require('./assets/Fonts/Genos-Bold.ttf'),
        GenosR: require('./assets/Fonts/Genos-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{title: 'Map Screen'}}

                />
                <Stack.Screen name="Settings" component={SettingScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


