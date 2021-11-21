import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsColorPicker from "./src/components/ColorPicker/SettingsColorPicker";
import SettingScreen from "./src/screens/Settings/SettingScreen";
import MapScreen from "./src/screens/Map/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={SettingScreen}/>
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{title: 'Map Screen'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


