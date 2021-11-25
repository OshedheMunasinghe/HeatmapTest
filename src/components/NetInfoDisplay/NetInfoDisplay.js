import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import styles from './NetInfoDisplay.styles'
import {t} from "../../language/language";

const connectionStatus = t('connection_status')
const connectionType = t('connection_type')
const connectionReachable = t('connection_reachable')
const freq = t('frequency')
const connected = t('connected')
const disconnected = t('disconnected')
const yes = t('yes')
const no = t('no')
const wifi_enable = t('wifi_enable')
const connectionDetail = t('connection_detail')
const connectionExpYes = t('connection_expensive_yes')
const connectionExpNo = t('connection_expensive_no')
const SSID = t('ssid')
const BSSID = t('bssid')
const strength = t('strength')
const ipAdress = t('ip_adress')
const subnet = t('subnet')
const cellularGeneration = t('cellularGeneration')
const signalStrength = t('signal_strength')
const carrier = t('carrier')
const checkYourConnection = t('check_you_connection')

const NetInfoDisplay = () => {
    NetInfo.configure({
        reachabilityUrl: 'https://clients3.google.com/generate_204',
        reachabilityTest: async (response) => response.status === 204,
        reachabilityLongTimeout: 60 * 1000, // 60s
        reachabilityShortTimeout: 1 * 1000, // 5s
        reachabilityRequestTimeout: 15 * 1000, // 15s
        reachabilityShouldRun: () => true,
    })

    const [state, setState] = useState({
        connectionStatus: false,
        connectionType: null,
        connectionReachable: false,
        connectionWifiEnabled: false,
        connectionDetails: null,
    })

    const [intervalTime, setIntervalTime] = useState(4000)
    const [randomNumber, setRandomNumber] = useState(randomSignalStrength())

    function randomSignalStrength() {
        return Math.floor(Math.random() * (99 - 65) + 65)
    }

    function unsubscribe() {
        NetInfo.fetch()
            .then((response) => {
                setState({
                    connectionStatus: response.isConnected,
                    connectionType: response.type,
                    connectionReachable: response.isInternetReachable,
                    connectionWifiEnabled: response.isWifiEnabled,
                    connectionDetails: response.details,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        unsubscribe()
        const interval = setInterval(() => {
            unsubscribe()
            setRandomNumber(randomSignalStrength())
        }, intervalTime)
        return () => clearInterval(interval)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                {connectionStatus} :{' '}
                {state.connectionStatus ? connected : disconnected}
            </Text>
            <Text style={styles.textStyle}>
                {connectionType} : {state.connectionType}
            </Text>
            <Text style={styles.textStyle}>
                {connectionReachable} : {state.connectionReachable ? yes : no}
            </Text>
            <Text style={styles.textStyle}>
                {wifi_enable}: {state.connectionWifiEnabled ? yes : no}
            </Text>
            <Text style={styles.textStyle}>
                {'\n'}{connectionDetail} : {'\n'}
                {state.connectionType == 'wifi'
                    ? (state.connectionDetails.isConnectionExpensive
                        ? connectionExpYes
                        : connectionExpNo) +
                    '\n' +
                    SSID +
                    state.connectionDetails.ssid +
                    '\n' +
                    BSSID +
                    state.connectionDetails.bssid +
                    '\n' +
                    strength +
                    state.connectionDetails.strength +
                    '\n' +
                    ipAdress +
                    state.connectionDetails.ipAddress +
                    '\n' +
                    subnet +
                    state.connectionDetails.subnet +
                    '\n' +
                    freq +
                    state.connectionDetails.frequency
                    : state.connectionType == 'cellular'
                        ? (state.connectionDetails.isConnectionExpensive
                            ? connectionExpYes
                            : connectionExpNo) +
                        '\n' +
                        cellularGeneration +
                        state.connectionDetails.cellularGeneration +
                        '\n' +
                        signalStrength +
                        randomNumber +
                        '\n' +
                        carrier +
                        state.connectionDetails.carrier
                        : checkYourConnection}
            </Text>
        </View>
    )
}

export default NetInfoDisplay
