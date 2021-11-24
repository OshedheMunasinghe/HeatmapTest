import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import {View} from "react-native";
import {Text} from "react-native-elements";
import {t} from "./src/language/language";


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
        // <MapScreen/>
        <View style={{margin: 100}}>
            {/*<Text>Hello World</Text>*/}
            <Text>{t("hello_world")}</Text>
            <Text>{t("bye_world")}</Text>
        </View>
    )
}


