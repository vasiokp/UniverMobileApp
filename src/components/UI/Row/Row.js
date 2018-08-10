import React from 'react'
import { View, StyleSheet } from 'react-native'

const Row = props => (
    <View style={[styles.row, { height: props.Height }]}>
        {props.children}
    </View>
);
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width:'100%',
        height: 20
    }
})
export default Row