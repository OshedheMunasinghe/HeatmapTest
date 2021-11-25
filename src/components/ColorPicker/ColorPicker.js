import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Button, Overlay, Text} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ColorPickerStyles} from "./colorPicker.styles";
import {t} from "../../language/language";

const defaultColors = ["#006400", "#90EE90", "#FFFF00", "#FFA500", "#FF0000"];

const save = t('save_title')
const cancel = t('cancel')
const chooseColorText = t('choose_color_text')
const defaultTitle = t('default_title')

const atHeatMapColors = "@heatmap_colors"
const {
    boderLineStyle,
    paletteButton,
    hueButton,
    textStyle,
    overlayContainer,
    colorPickerContainer,
    hueButtonsContainer,
    buttonsContainer,
    buttonStyle,
    buttonFlexContainer,
    buttonCancelContainer,
    buttonDefaultContainer,
    buttonDisable,
    buttonSaveContainer,
    buttonFontSize,
    buttonRightLine
} = ColorPickerStyles

const buttonTargetHighLight = "#36E7FF"
const buttonUnTarget = "#343C50"

const ColorPicker = ({visible, setVisible, onSave}) => {
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [pickedButton, setPickedButton] = useState(0);
    const [buttonColors, setButtonColors] = useState(defaultColors); // Default colors

    useEffect(() => {
        loadHeatmapColors();
    }, []);

    const loadHeatmapColors = async () => {
        try {
            let heatmapColors = buttonColors;
            const json = await AsyncStorage.getItem(atHeatMapColors);
            if (json != null) {
                heatmapColors = JSON.parse(json);
                setButtonColors(heatmapColors);
            }
        } catch (e) {
            console.warn("Error restoring data from async storage");
        }
    };

    const saveHeatmapColors = async () => {
        try {
            await AsyncStorage.setItem(
                atHeatMapColors,
                JSON.stringify(buttonColors)
            );
        } catch (e) {
            console.log("Error saving data to async storage");
        }
    };

    const generateHueButtons = () => {
        const list = [];
        const buttons = 48;
        for (let i = 0; i < buttons; i++) {
            const hsl = `hsl(${Math.round((i * 360.0) / buttons)},100%,50%)`;
            list.push(
                <View key={i} style={{flex: 1, backgroundColor: hsl}}>
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
                        buttonStyle={[
                            hueButton,
                            {
                                // padding: 0,
                                // height: 32,
                                // borderColor: "#000",
                                backgroundColor: hsl,
                            },
                        ]}
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
                        buttonStyle={[
                            paletteButton,
                            {
                                backgroundColor: buttonColors[i],
                                borderColor: i === pickedButton ? buttonTargetHighLight : buttonUnTarget,
                            },
                        ]}
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
        onSave && onSave();
    };

    const onCancel = () => {
        loadHeatmapColors();
        setPickedButton(0);
        setSaveButtonDisabled(true);
        setVisible(false);
    };

    const onDefault = () => {
        setSaveButtonDisabled(false);
        setButtonColors(defaultColors);
    };

    return (
        <Overlay visible={visible} overlayStyle={overlayContainer}>
            <Text style={textStyle}>{chooseColorText}</Text>
            <View style={boderLineStyle}/>

            {/* * color picker*/}
            <View style={colorPickerContainer}>
                <View style={hueButtonsContainer}>
                    {generateHueButtons()}
                </View>
            </View>

            <View style={buttonFlexContainer}>
                {buttonColors && generatePaletteButtons()}
            </View>
            <View
                style={buttonsContainer}
            >
                <Button
                    titleStyle={[buttonSaveContainer, buttonFontSize]}
                    title={save}
                    buttonStyle={[buttonStyle, buttonRightLine]}
                    disabled={saveButtonDisabled}
                    disabledStyle={buttonDisable}
                    onPress={saveColors}
                />
                <Button
                    titleStyle={[buttonCancelContainer, buttonFontSize]}
                    title={cancel}
                    buttonStyle={[buttonStyle, buttonRightLine]}
                    onPress={onCancel}
                />
                <Button
                    titleStyle={[buttonDefaultContainer, buttonFontSize]}
                    title={defaultTitle}
                    buttonStyle={buttonStyle}
                    onPress={onDefault}
                />
            </View>
        </Overlay>
    );
};

export default ColorPicker;
