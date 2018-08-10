import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TEXT_COLOR } from '../../../plugins/AppColors'
const mainText = props => (
    <Text style={styles.mainText}>{props.children}</Text>
)

const styles = StyleSheet.create({
    mainText: {
        color: TEXT_COLOR,
        fontFamily: 'Roboto',
        fontSize: 14,
        backgroundColor: 'transparent'
    }
})

export default mainText