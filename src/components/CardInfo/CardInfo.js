import React from 'react'
import {View} from 'react-native'
import {Card} from 'react-native-elements'
import NetInfoDisplay from '../NetInfoDisplay/NetInfoDisplay'
import styles from './cardInfo.styles'
import {t} from '../../language/language'

const connectionDetail = t('connection_detail')
const CardInfo = () => {
    return (
        <View style={styles.cardView}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.textStyle}>{connectionDetail}</Card.Title>
                <Card.Divider/>
                <NetInfoDisplay/>
            </Card>
        </View>
    )
}

export default CardInfo
