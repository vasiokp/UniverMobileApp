import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Switch, TouchableOpacity, Picker, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Ionicons'

const ANIMATION_DURATION = 300

const LAYOUT_HEIGHT = 70

const pickerStyle = StyleSheet.create({
	viewContainer: {
		position: 'absolute',
		width: 0,
		height: 0,
		top: -999
	}
})

const chevronIcon = (
	<Icon name="ios-arrow-down" size={16} style={{ marginLeft: 5 }} />
)

const defaultPickerItem = {
	value: -1,
	label: ''
}

class NewsFilter extends Component {
	constructor(props) {
		super(props)
		this.backgroundOpacity = new Animated.Value(0)
		this.layoutTop = new Animated.Value(-LAYOUT_HEIGHT)
		this.state = {
			isShown: false,
			newsTypeId: null,
		}
	}

	newsTypeKeyValues() {
		let items = this.props.newsTypes.sort((a, b) => a.Name - b.Name).map(nt => {
			return {
				label: nt.Name,
				value: nt.Id
			}
		})
		items.unshift({ label: 'Всі', value: -1 })

		return items && items.length > 0 ? items : [defaultPickerItem]
	}

	selectedNewsType() {
		if (this.props.filters.newsTypeId == null) {
			return 'Всі'
		}
		const newsType = this.props.newsTypes.find(a => a.Id === this.props.filters.newsTypeId)
		if (newsType) {
			return newsType.Name
		}
		return ''
	}

	show() {
		this.setState({
			isShown: true,
			newsTypeId: this.props.filters.newsTypeId
		})
		Animated.parallel([
			Animated.timing(this.backgroundOpacity, {
				duration: ANIMATION_DURATION,
				toValue: 1,
			}),
			Animated.timing(this.layoutTop, {
				duration: ANIMATION_DURATION,
				toValue: 0,
			})
		]).start()
	}

	hide() {
		Animated.parallel([
			Animated.timing(this.backgroundOpacity, {
				duration: ANIMATION_DURATION,
				toValue: 0,
			}),
			Animated.timing(this.layoutTop, {
				duration: ANIMATION_DURATION,
				toValue: -LAYOUT_HEIGHT,
			}),
		]).start(() => {
			this.setState({ isShown: false })
			if (Platform.OS !== 'ios'){
				this.props.onChange({ 
					newsTypeId: this.state.newsTypeId === -1 ? null : this.state.newsTypeId,
				 })
			}
			if (this.props.onClose) {
				this.props.onClose()
			}
		})
	}

	getPickerItemsForAndroid (items) {
		return items.map((s, i) => {
            return <Picker.Item key={i} value={s.value} label = {s.label} />
		})
	}

	getRowWrapperForAndroid (title, children) {
		return (
			<View style={styles.row}>
				<Text style={[styles.label, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}>
					{title}
				</Text>
				{children}
			</View>
		)
	}



	buildNewsTypeRowAndroid () {
		let items = this.getPickerItemsForAndroid(this.newsTypeKeyValues())
		let pickerEl = (
            <Picker
				style={{ flex:2 }}
				enabled={true}
				selectedValue={this.state.newsTypeId || -1}
				onValueChange={value => this.setState({ newsTypeId: value })}>
					{items}
            </Picker>
		)
		return this.getRowWrapperForAndroid("Категорії", pickerEl)
	}

	buildNewsTypeRowiOS () {
		return (
			<View style={styles.row}>
                <Text style={[styles.label]}>
                    Категорії
                </Text>
                <TouchableOpacity
                    style={[styles.picker]}
                    activeOpacity={0.4}
                    onPress={() => this.newsTypePicker.togglePicker(true)}>
                    <Text style={styles.pickerLabel}
                        numberOfLines={1}
                        ellipsizeMode="middle">
                        {this.selectedNewsType()}
                    </Text>
                    {chevronIcon}
                </TouchableOpacity>
                <RNPickerSelect
                    ref={newsTypePicker => this.newsTypePicker = newsTypePicker}
                    placeholder={{ label: 'Всі', value: null }}
                    hideIcon={true}
                    items={this.newsTypeKeyValues()}
                    onValueChange={value => this.setState({ newsTypeId: value })}
                    onDonePress={() => this.props.onChange({ newsTypeId: this.state.newsTypeId })}
                    style={{ ...pickerStyle }}
                    children={null}
                    value={this.state.newsTypeId || -1}
                />
            </View>
		)
	}


	render() {
		let newsTypeRow = null
		if (Platform.OS !== 'ios'){
			newsTypeRow = this.buildNewsTypeRowAndroid()
		} else {
			newsTypeRow = this.buildNewsTypeRowiOS()
		}


		return (this.state.isShown || Platform.OS === 'ios') ? (
			<View style={[styles.overlay, { display: this.state.isShown ? 'flex' : 'none' }]}>
				<Animated.View style={[
					styles.background,
					{ opacity: this.backgroundOpacity }
				]}
					onStartShouldSetResponder={() => this.hide()}>
				</Animated.View>
				<Animated.View style={[
					styles.layout,
					{ top: this.layoutTop }
				]}>
					{newsTypeRow}
				</Animated.View>
			</View>
		) : null
	}
}

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	layout: {
		position: 'absolute',
		left: 0,
		width: '100%',
		height: LAYOUT_HEIGHT,
		backgroundColor: '#fff',
		paddingLeft: 25,
		paddingVertical: 5,
		paddingRight: 0
	},
	row: {
		height: 42,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderColor: '#ddd',
		paddingVertical: 6,
		paddingRight: 15
	},
	lastRow: {
		borderBottomWidth: 0
	},
	picker: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 2
	},
	label: {
		fontSize: 16,
		fontWeight: '300',
		marginRight: 20,
		flex: 1
	},
	pickerLabel: {
		fontSize: 16
	},
	disabled: {
		opacity: 0.6
	}
})

export default NewsFilter
