import React, {useState, useEffect} from 'react';
import {View} from "react-native";
import {Button, Card, Overlay} from 'react-native-elements';


const SettingsColorPicker = ({props}) => {
        const [visible, setVisible] = useState(props);
        const [pickedButton, setPickedButton] = useState(-1)
        const [buttonColors, setButtonColors] = useState(['#006400', '#ff0000', 'pink', 'purple', "gold"])
        const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)

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


        const generateHueButtons = () => {
            const list = []
            const buttons = 32
            for (let i = 0; i < buttons; i++) {
                const hsl = `hsl(${Math.round(i * 360.0 / buttons)},100%,50%)`
                list.push(
                    <View style={{flex: 1, padding: 0, backgroundColor: hsl}}>
                        <Button
                            onPress={() => {
                                if (pickedButton !== -1) {
                                    const a = buttonColors.slice(0, pickedButton)
                                    const b = buttonColors.slice(pickedButton + 1)
                                    const c = a.concat(hsl).concat(b)
                                    setButtonColors(c)
                                    setSaveButtonDisabled(false)

                                }
                            }}
                            buttonStyle={{padding: 0, height: 60, border: 0, backgroundColor: hsl}}/>
                    </View>)
            }
            return list
        }


        const generatePaletteButtons = () => {
            const list = []
            const buttons = 5
            for (let i = 0; i < buttons; i++) {

                list.push(
                    <View>
                        <Button buttonStyle={{width: 60, height: 60, backgroundColor: buttonColors[i]}}
                                onPress={() => {
                                    setPickedButton(i)
                                }}/>
                    </View>)
            }
            return list
        }

        const saveColors = () => {
            console.log(buttonColors)
            toggleOverlay()
        }

        return (
            <View style={{flex: 1, alignItems: 'center', flexDirection: 'row',}}>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}}>
                    <Card containerStyle={{minHeight: '40%', borderRadius: 8}}>
                        <Card.Title>CHOOSE COLOR</Card.Title>
                        {/* * color picker*/}
                        <View style={{top: 28, minHeight: 64}}>
                            <View style={{minHeight: "8%", bottom: 32, flexDirection: "row"}}>
                                {pickedButton !== -1 && generateHueButtons()}
                            </View>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                            {generatePaletteButtons()}
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "center", top: 18}}>
                            <Button title={'SPARA'} buttonStyle={{margin: 8, padding: 16}} disabled={saveButtonDisabled}
                                    onPress={saveColors}/>
                            <Button title={'AVBRYT'} buttonStyle={{margin: 8, padding: 16}} onPress={toggleOverlay}/>
                        </View>
                    </Card>
                </Overlay>
            </View>
        );
    }
;
export default SettingsColorPicker
