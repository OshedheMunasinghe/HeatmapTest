import React, {useState} from "react";
import {Text} from "react-native-elements";
import {ScrollView, SafeAreaView, View,} from "react-native";
import SettingsColorPicker from "../../components/ColorPicker/SettingsColorPicker";

// const [itemClicked, setItemClicked] = useState(-1)

const heatmapHandler = () => {
    console.log('last item = ')
    // return <SettingsColorPicker/>
}


const items = [
    {
        id: 1,
        title: 'Heatmap färger',
        description: 'Byt färger på heatmap i kartan',
        onPress: heatmapHandler,
        jsx: <SettingsColorPicker props={true}/>
    },
    {id: 2, title: 'Byt Kartstil', description: 'Välj färgtema på kartan', jsx: <SettingsColorPicker props={true}/>}
]
let test = false
const setupHandler = (item) => {
    test = true
    console.log('pressed ' + item.id)
    item.onPress && item.onPress()
}

const SettingScreen = () => {
    const [itemClicked, setItemClicked] = useState(-1)


    return (
        <SafeAreaView>
            <ScrollView>
                {items.map(item => (
                    <View key={item.id}
                          style={{padding: 18, borderBottomWidth: 1, borderColor: "#ccc"}}>
                        <Text style={{fontWeight: "bold", fontSize: 16}}
                              onPress={() => {
                                  setItemClicked(item.id)
                                  setupHandler(item)
                              }}>{item.title} </Text>
                        {item.description && <Text style={{color: "#777"}} onPress={() => {
                            setItemClicked(item.id)
                            setupHandler(item)
                        }}>{item.description}</Text>}
                        {test && item.id === itemClicked && item.jsx}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
export default (SettingScreen)
