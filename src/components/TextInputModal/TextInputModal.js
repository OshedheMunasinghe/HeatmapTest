import {Text, ToastAndroid, View} from 'react-native'
import React, {useState} from 'react'
import {Button, Input, Overlay} from 'react-native-elements'
import styles from './TextInputModal.styles'
import axios from 'axios'
import {t} from "../../language/language";

const toastUnValidText = 'Not a valid address'
const toastNoSendText = 'Nothing to send'
const toastSending = 'Sending..'
const toastSuccess = 'Success!'
const toastError = 'Something went wrong!'

const cancel = t('cancel')
const send = t('send')
const sendAddress = t('server_address')
const headerPost = t('headerPostTitle')

const TextInputModal = (props) => {
    const [textInput, setTextInput] = useState('')

    const handleOnChangeText = () => {
        if (textInput.length < 1) {
            ToastAndroid.show(toastUnValidText, ToastAndroid.SHORT)
            return null
        }
        if (props.points.points.length < 1) {
            ToastAndroid.show(toastNoSendText, ToastAndroid.SHORT)
            return null
        } else {
            postLogs()
            toggleOverlay()
        }
    }

    const postLogs = () => {
        ToastAndroid.show(toastSending, ToastAndroid.SHORT)
        axios
            .post(textInput, props.logs)
            .then(function (response) {
                if (response.status === 200) {
                    ToastAndroid.show(toastSuccess, ToastAndroid.SHORT)
                    props.points.setPoints([])
                }
            })
            .catch(function (error) {
                console.warn('Error: ', error)
                ToastAndroid.show(toastError, 30)
            })
    }

    const toggleOverlay = () => {
        props.visible.setTextInputVisible(!props.visible.textInputVisible)
    }

    return (
        <View style={styles.cardView}>
            <Overlay isVisible={props.visible.textInputVisible}>
                <Text>{headerPost} </Text>
                <Input
                    placeholder={sendAddress}
                    style={styles.inputStyle}
                    value={textInput}
                    onChangeText={(event) => setTextInput(event)}
                />
                <View style={styles.button}>
                    <Button title={cancel} onPress={() => toggleOverlay()}/>
                    <Button title={send} onPress={() => handleOnChangeText()}/>
                </View>
            </Overlay>
        </View>
    )
}

export default TextInputModal
