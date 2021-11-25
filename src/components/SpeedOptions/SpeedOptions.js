import React, {useState} from "react";
import {Alert, View} from "react-native";

import {SpeedDial} from "react-native-elements";
import ColorPicker from "../ColorPicker/ColorPicker";
import {SpeedOptionsStyles} from "./speedOptions.styles";
import {t} from "../../language/language";

const iconColor = "white"
const icons = {
    edit: {name: "add", color: iconColor},
    map: {name: "dashboard", color: iconColor},
    dashboard: {name: "public", color: iconColor},
    settings: {name: "palette", color: iconColor},
    send: {name: "cloud-upload", color: iconColor},
    delete: {name: "delete", color: iconColor},
    openDialIcon: {name: "close", color: iconColor}
};

const speedActionColor = "#6E7B9A";
const speedDialColor = "#171C28"

const areYouSure = t('are_you_sure_')
const alertText = t('alert_text')
const cancel = t('cancel')
const yes = t('yes')
const dashboard = t('title_dashboard')
const satelliteTitle = t('title_satellite')
const mapTitle = t('title_map')
const heatmapColorsTitle = t('title_heatmapColors')
const sendToServerTitle = t('title_sendtoserver')
const deleteTitle = t('delete')

const alertStyle = "cancel"
const mapStandardStyle = "standard"
const mapStatelliteStyle = "satellite"

const {speedContainer, textContainer} = SpeedOptionsStyles

const SpeedOptions = (props) => {
    const [open, setOpen] = useState(false);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const changeMapType = (props) => {
        if (props.mapTypeProps.mapType === mapStandardStyle) {
            props.mapTypeProps.setMapType(mapStatelliteStyle);
        } else if (props.mapTypeProps.mapType === mapStatelliteStyle) {
            props.mapTypeProps.setMapType(mapStandardStyle);
        }
    };

    const showCard = (props) => {
        if (props.cardProps.cardVisible === false) {
            props.cardProps.setCardVisible(true);
        } else if (props.cardProps.cardVisible === true) {
            props.cardProps.setCardVisible(false);
        }
    };
    const showTextInput = () => {
        return props.textInputProp.setTextInputVisible(
            !props.textInputProp.textInputVisible
        );
    };

    const deleteArray = () => {
        Alert.alert(
            areYouSure,
            alertText,
            [
                {
                    text: cancel,
                    style: alertStyle,
                },
                {text: yes, onPress: () => props.deletePoints.setPoints([])},
            ]
        );
    };

    return (
        <>
            <View>
                <ColorPicker
                    visible={colorPickerVisible}
                    setVisible={setColorPickerVisible}
                    onSave={props.onChange}
                />
            </View>

            <SpeedDial
                color={speedDialColor}
                style={speedContainer}
                isOpen={open}
                icon={icons.edit}
                openIcon={icons.openDialIcon}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                    titleStyle={textContainer}
                    color={speedActionColor}
                    icon={icons.map}
                    title={dashboard}
                    onPress={() => showCard(props)}
                />
                <SpeedDial.Action
                    color={speedActionColor}
                    icon={icons.dashboard}
                    title={
                        props.mapTypeProps.mapType === mapStandardStyle ? satelliteTitle : mapTitle
                    }
                    onPress={() => changeMapType(props)}
                    titleStyle={textContainer}
                />
                <SpeedDial.Action
                    color={speedActionColor}
                    icon={icons.settings}
                    title={heatmapColorsTitle}
                    onPress={() => setColorPickerVisible(true)}
                    titleStyle={textContainer}
                />
                <SpeedDial.Action
                    color={speedActionColor}
                    icon={icons.send}
                    title={sendToServerTitle}
                    onPress={showTextInput}
                    titleStyle={textContainer}
                />
                <SpeedDial.Action
                    color={speedActionColor}
                    icon={icons.delete}
                    title={deleteTitle}
                    onPress={deleteArray}
                    titleStyle={textContainer}
                />
            </SpeedDial>
        </>
    );
};

export default SpeedOptions;
