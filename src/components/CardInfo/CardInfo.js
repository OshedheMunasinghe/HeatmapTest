import React from 'react'
import {View} from 'react-native'
import {Card} from 'react-native-elements'
import NetInfoDisplay from '../NetInfoDisplay/NetInfoDisplay'
import {CardInfoStyles} from './cardInfo.styles'
import {t} from '../../language/language'

const connectionDetail = t('connection_detail')
const {card, cardView, textStyle} = CardInfoStyles
const CardInfo = () => {
    return (
        <View style={cardView}>
            <Card containerStyle={card}>
                <Card.Title style={textStyle}>{connectionDetail}</Card.Title>
                <Card.Divider/>
                <NetInfoDisplay/>
            </Card>
        </View>
    )
}

export default CardInfo
