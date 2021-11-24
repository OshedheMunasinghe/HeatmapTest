import React, { useState } from "react";
import { Alert, View } from "react-native";

import { SpeedDial } from "react-native-elements";
import ColorPicker from "../ColorPicker/ColorPicker";
import styles from "./SpeedOptions.styles";

const icons = {
  edit: { name: "edit", color: "black" },
  map: { name: "map", color: "black" },
  dashboard: { name: "dashboard", color: "black" },
  settings: { name: "settings", color: "black" },
  send: { name: "send", color: "black" },
  delete: { name: "delete", color: "black" },
};

const SpeedOptions = (props) => {
  const [open, setOpen] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const changeMapType = (props) => {
    if (props.mapTypeProps.mapType === "standard") {
      props.mapTypeProps.setMapType("satellite");
    } else if (props.mapTypeProps.mapType === "satellite") {
      props.mapTypeProps.setMapType("standard");
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
      "Are you sure?",
      "Are you sure you want to delete this recording?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Yes", onPress: () => props.deletePoints.setPoints([]) },
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
        color="#D3D3D3"
        style={styles.speedContainer}
        isOpen={open}
        icon={icons.edit}
        openIcon={{ name: "close", color: "black" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          titleStyle={{ fontFamily: "GenosR" }}
          color="#D3D3D3"
          icon={icons.map}
          title="Dashboard"
          onPress={() => showCard(props)}
        />
        <SpeedDial.Action
          color="#D3D3D3"
          icon={icons.dashboard}
          title={
            props.mapTypeProps.mapType === "standard" ? "Satellit" : "Karta"
          }
          onPress={() => changeMapType(props)}
        />
        <SpeedDial.Action
          color="#D3D3D3"
          icon={icons.settings}
          title="Heatmap Colors"
          onPress={() => setColorPickerVisible(true)}
        />
        <SpeedDial.Action
          color="#D3D3D3"
          icon={icons.send}
          title="Send to server"
          onPress={showTextInput}
        />
        <SpeedDial.Action
          color="#D3D3D3"
          icon={icons.delete}
          title="Delete"
          onPress={deleteArray}
        />
      </SpeedDial>
    </>
  );
};

export default SpeedOptions;
