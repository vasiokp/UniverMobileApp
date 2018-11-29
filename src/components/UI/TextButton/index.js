import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const defaultStyle = {
	alignSelf: 'center',
	fontSize: 17,
	color: '#666',
	paddingHorizontal: 15,
	paddingVertical: 7
}

const textButton = props => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Text style={{...defaultStyle, ...props.style }}>{props.title}</Text>
		</TouchableOpacity>
	)
}

export default textButton
