import React from 'react'
import moment from 'moment'
import { View, Text, StyleSheet } from 'react-native'
import { capitalize } from '../../../utils'

const scheduleDay = ({ day }) => {
	let date = moment(day.timestamp)
	let isToday = date.isSame(moment(), 'date')
	return (
		<View style={styles.layout}>
			<Text style={[styles.text, isToday ? styles.todayText : {}]}>
				{capitalize(date.format('dddd, D MMMM'))}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  layout: {
		paddingTop: 20,
		paddingHorizontal: 20,
		paddingBottom: 3,
		borderBottomWidth: 0.5,
		borderColor: '#ddd'
	},
	text: {
		fontSize: 14,
		fontWeight: '300',
		color: '#7a92a5'
	},
	todayText: {
		color: '#F89554'
	}
})

export default scheduleDay