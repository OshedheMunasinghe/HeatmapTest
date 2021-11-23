import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SpeedDial, Button, Card, Overlay } from "react-native-elements";
import ColorPicker from "../ColorPicker/ColorPicker";

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

  return (
    <>
      <View>
        <ColorPicker
          visible={colorPickerVisible}
          setVisible={setColorPickerVisible}
        />
      </View>
      <SpeedDial
        color="#D3D3D3"
        style={styles.speedContainer}
        isOpen={open}
        icon={{ name: "edit", color: "black" }}
        openIcon={{ name: "close", color: "black" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          titleStyle={{ fontFamily: "GenosR" }}
          color="#D3D3D3"
          icon={{ name: "map", color: "black" }}
          title="Dashboard"
          onPress={() => showCard(props)}
        />
        <SpeedDial.Action
          color="#D3D3D3"
          icon={{ name: "dashboard", color: "black" }}
          title={
            props.mapTypeProps.mapType === "standard" ? "Satellit" : "Karta"
          }
          onPress={() => changeMapType(props)}
        />
        <SpeedDial.Action
          color="#D3D3D3"
          icon={{ name: "settings", color: "black" }}
          title="Heatmap Colors"
          // onPress={() => alert('-- Color Picker --')}
          onPress={() => setColorPickerVisible(true)}
        />
      </SpeedDial>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 38,
    paddingHorizontal: 10,
  },
  speedContainer: {
    marginBottom: 23,
  },
});
export default SpeedOptions;
