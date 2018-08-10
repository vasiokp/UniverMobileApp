import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Cell from '../UI/Cell/Cell'
import Row from '../UI/Row/Row'
import { BLOCK_BORDER_COLOR, BACK_COLOR } from '../../plugins/AppColors'

const columnsWidth = []

const TableHeader = (props) => {
  columnsWidth = []
  if (props.HeaderColumns && props.HeaderColumns.length > 0) {
    return (
      <Row Height={props.HeaderHeight}>
        {
          props.HeaderColumns.map(
            (item, index) => {
              columnsWidth.push(item.Width)
              return <Cell key={index} Text={item.Text} style={{ width: item.Width, alignItems: 'center' }} />
            })}
      </Row>
    )
  }
  return null
}

const TableRow = props => {
  return (
    <Row Height={props.RowHeight}>
      {
        props.DisplayFields.map(
          (el, index) => {
            return <Cell key={props.Item.id + '-' + index} Text={props.Item[el]} style={{ width: columnsWidth[index] }} />
          }
        )
      }
    </Row>)
}

const TableBody = props => {
  if (props.Items && props.DisplayFields && props.Items.length > 0 && props.DisplayFields.length > 0) {
    return (
      <ScrollView>
        {props.Items.map(
          (item) => {
            return (
              <TouchableOpacity key={item.id} onPress={props.onItemPressed.bind(this, item.id)} activeOpacity={0.7}>
                <TableRow key={item.id} Item={item} RowHeight={props.RowHeight} DisplayFields={props.DisplayFields} />
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    )
  }
  return null
}

const Table = props => {
  return (
    <View style={styles.table}>
      <TableHeader HeaderColumns={props.HeaderColumns} HeaderHeight={props.HeaderHeight} />
      <TableBody Items={props.Items} onItemPressed={props.onItemPressed} RowHeight={props.RowHeight} DisplayFields={props.DisplayFields} />
    </View>
  )
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: BACK_COLOR,
    padding: 10,
    marginTop: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: BLOCK_BORDER_COLOR
  }
})

export default Table;