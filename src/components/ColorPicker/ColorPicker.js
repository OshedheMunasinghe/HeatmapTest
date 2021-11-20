import React, {useState, useEffect} from 'react';
import {View} from "react-native";
import {Button, Overlay, Text, Card, Chip} from 'react-native-elements';

const colors = ['darkgreen', 'lightgreen', 'yellow', 'orange', 'red']
const ColorPicker = ({props}) => {
    const [visible, setVisible] = useState(props);

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
                <View style={{flexDirection: "row", justifyContent: "space-evenly" }}>
                    {colors.map((col, id) => (
                        <View>
                            <Button buttonStyle={{backgroundColor: col, width: 60}} title={'abc'} key={id}>Item {id}</Button>
                        </View>
                    ))}
                </View>

            </Card>
        </View>
    );
};
export default ColorPicker
