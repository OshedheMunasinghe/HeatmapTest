import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Card, Overlay} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ColorPicker = ({visible, setVisible, onSave}) => {
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [pickedButton, setPickedButton] = useState(-1);
    const [buttonColors, setButtonColors] = useState([  // Default colors
        "#0E0",
        "#0D0",
        "yellow",
        "orange",
        "red",
    ]);

    useEffect(() => {
        return () => {
            loadHeatmapColors()
            console.log('useEffect: loadHeatmapColors')
        };
    }, []);

    const loadHeatmapColors = async () => {
        try {
            let heatmapColors = buttonColors
            const json = await AsyncStorage.getItem('@heatmap_colors')
            if (json != null) {
                heatmapColors = JSON.parse(json)
                setButtonColors(heatmapColors)
                console.log('Loaded colors from Async Storage')
            }

        } catch (e) {
            console.log('Error restoring data from async storage')
        }
    }

    const saveHeatmapColors = async () => {
        try {
            await AsyncStorage.setItem('@heatmap_colors', JSON.stringify(buttonColors))
        } catch (e) {
            console.log('Error saving data to async storage')
        }
    }

    const generateHueButtons = () => {
        const list = [];
        const buttons = 48;
        for (let i = 0; i < buttons; i++) {
            const hsl = `hsl(${Math.round((i * 360.0) / buttons)},100%,50%)`;
            list.push(
                <View key={i} style={{flex: 1, padding: 0, backgroundColor: hsl}}>
                    <Button
                        onPress={() => {
                            if (pickedButton !== -1) {
                                const a = buttonColors.slice(0, pickedButton);
                                const b = buttonColors.slice(pickedButton + 1);
                                const c = a.concat(hsl).concat(b);
                                setButtonColors(c);
                                setSaveButtonDisabled(false);
                            }
                        }}
                        buttonStyle={{
                            padding: 0,
                            height: 32,
                            border: 0,
                            borderColor: "#000",
                            backgroundColor: hsl,
                        }}
                    />
                </View>
            );
        }
        return list;
    };

    const generatePaletteButtons = () => {
        const list = [];
        const buttons = 5;
        for (let i = 0; i < buttons; i++) {
            list.push(
                <View key={i}>
                    <Button
                        buttonStyle={{
                            width: 60,
                            height: 60,
                            backgroundColor: buttonColors[i],
                        }}
                        onPress={() => {
                            setPickedButton(i);
                        }}
                    />
                </View>
            );
        }
        return list;
    };

    const saveColors = () => {
        saveHeatmapColors();
        setSaveButtonDisabled(false);
        setVisible(false);
        onSave && onSave()
    };

    return (
        <Overlay visible={visible} overlayStyle={{width: "90%"}}>
            <Card
                containerStyle={{
                    minHeight: "40%",
                    borderRadius: 8,
                    marginBottom: 20,
                }}
            >
                <Card.Title>CHOOSE COLOR</Card.Title>
                {/* * color picker*/}
                <View style={{top: 28, minHeight: 64}}>
                    <View style={{minHeight: "8%", bottom: 32, flexDirection: "row"}}>
                        {generateHueButtons()}
                    </View>
                </View>

                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    {buttonColors && generatePaletteButtons()}
                </View>
                <View
                    style={{flexDirection: "row", justifyContent: "center", top: 18}}
                >
                    <Button
                        title={"SPARA"}
                        buttonStyle={{margin: 8, padding: 16}}
                        disabled={saveButtonDisabled}
                        onPress={saveColors}
                    />
                    <Button
                        title={"AVBRYT"}
                        buttonStyle={{margin: 8, padding: 16}}
                        onPress={() => setVisible(false)}
                    />
                </View>

            </Card>
        </Overlay>
    );
};

export default ColorPicker;

const styles = StyleSheet.create({});
