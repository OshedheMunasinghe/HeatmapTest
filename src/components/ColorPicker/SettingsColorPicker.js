import React, {useState, useEffect} from 'react';
import {View} from "react-native";
import {Button, Card} from 'react-native-elements';
import ColorPicker from 'react-native-wheel-color-picker'

const colors = ['#006400', '#90ee90', '#ffff00', '#ffa500', '#ff0000']
const SettingsColorPicker = ({props}) => {
    const [visible, setVisible] = useState(props);
    const [picker, setPicker] = useState(null)
    const [pickedColor, setPickedColor] = useState('')

    const toggleOverlay = () => {
        console.log('toggle overlay')
        setVisible(!visible);
    };
    useEffect(() => {
        return () => {
            setVisible(false)
            console.log('bye ')
        };
    }, []);

    return (
        <View>
            {/*<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>*/}
            <Card containerStyle={{minHeight: '90%', borderRadius: 8}}>
                <Card.Title>CARD WITH DIVIDER</Card.Title>
                <Card.Divider/>

                {/* * color picker*/}

                <View style={{ minHeight: "70%", bottom: 32}}>
                    { pickedColor !== '' && <ColorPicker ref={ r => setPicker(r)} color={pickedColor} onColorChangeComplete={() => console.log(picker.color)}
                    />}
                </View>

                {/* * Buttons */}
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    {colors.map((col, id) => (
                        <View>
                            <Button buttonStyle={{backgroundColor: col, width: 60}}
                                    title={'abc'}
                                    key={id}
                            onPress={ () => setPickedColor(col)}>Item {id}</Button>
                        </View>
                    ))}
                </View>

            </Card>
        </View>
    );
};
export default SettingsColorPicker
