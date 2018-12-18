import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Switch, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Ionicons'

const ANIMATION_DURATION = 300

const LAYOUT_HEIGHT = 220

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

class SheduleFilter extends Component {
	constructor(props) {
		super(props)
		this.backgroundOpacity = new Animated.Value(0)
		this.layoutTop = new Animated.Value(-LAYOUT_HEIGHT)
		this.state = {
			isShown: false,
			groupId: null,
			teacherId: null,
			subjectId: null,
			auditoryId: null
		}
	}

	groupKeyValues() {
		const items = this.props.groups.sort((a, b) => a.Name - b.Name).map(g => {
			const specialty = this.props.specialties.find(s => s.Id === g.SpecialtyId)
			return {
				label: `${g.Name}${specialty ? ' (' + specialty.Name + ')' : ''}`,
				value: g.Id
			}
		})
		return items && items.length > 0 ? items : [defaultPickerItem]
	}

	teacherKeyValues() {
		const items = this.props.teachers.sort((a, b) => a.Name - b.Name).map(t => {
			return {
				label: t.Name,
				value: t.Id
			}
		})
		return items && items.length > 0 ? items : [defaultPickerItem]
	}

	subjectKeyValues() {
		const items = this.props.subjects.sort((a, b) => a.Name - b.Name).map(s => {
			return {
				label: s.Name,
				value: s.Id
			}
		})
		return items && items.length > 0 ? items : [defaultPickerItem]
	}

	auditoryKeyValues() {
		const items = this.props.auditories.sort((a, b) => a.Name - b.Name).map(a => {
			return {
				label: a.Name,
				value: a.Id
			}
		})
		return items && items.length > 0 ? items : [defaultPickerItem]
	}

	selectedGroup() {
		if (this.props.filters.groupId == null) {
			return 'Всі'
		}
		const group = this.props.groups.find(g => g.Id === this.props.filters.groupId)
		if (group) {
			const specialty = this.props.specialties.find(s => s.Id === group.SpecialtyId)
			return `${group.Name}${specialty ? ' (' + specialty.Name + ')' : ''}`
		}
		return ''
	}

	selectedTeacher() {
		if (this.props.filters.teacherId == null) {
			return 'Всі'
		}
		const teacher = this.props.teachers.find(t => t.Id === this.props.filters.teacherId)
		if (teacher) {
			return teacher.Name
		}
		return ''
	}

	selectedSubject() {
		if (this.props.filters.subjectId == null) {
			return 'Всі'
		}
		const subject = this.props.subjects.find(s => s.Id === this.props.filters.subjectId)
		if (subject) {
			return subject.Name
		}
		return ''
	}

	selectedAuditory() {
		if (this.props.filters.auditoryId == null) {
			return 'Всі'
		}
		const auditory = this.props.auditories.find(a => a.Id === this.props.filters.auditoryId)
		if (auditory) {
			return auditory.Name
		}
		return ''
	}

	show() {
		this.setState({
			isShown: true,
			groupId: this.props.filters.groupId,
			teacherId: this.props.filters.teacherId,
			subjectId: this.props.filters.subjectId,
			auditoryId: this.props.filters.auditoryId
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
			if (this.props.onClose) {
				this.props.onClose()
			}
		})
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return this.state.isShown !== nextState.isShown ||
	// 	this.state.groupId !== nextState.groupId ||
	// 	this.state.teacherId !== nextState.teacherId ||
	// 	this.state.subjectId !== nextState.subjectId ||
	// 	this.state.auditoryId !== nextState.auditoryId
	// }

	render() {
		const mode = this.state.isShown ? 'flex' : 'none'
		return (
			<View style={[styles.overlay, { display: mode }]}>
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
					<View style={styles.row}>
						<Text style={styles.label} numberOfLines={1} adjustsFontSizeToFit={true}>
							Показувати тільки мій розклад
						</Text>
						<Switch value={this.props.filters.showOnlyMySchedule}
							onValueChange={value => this.props.onChange({
								showOnlyMySchedule: value,
								...(value ? {
									showOnlyFilteredSchedule: false
								} : {})
							})}
						/>
					</View>
					<View style={styles.row}>
						<Text style={[styles.label, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}>
							Група
						</Text>
						<TouchableOpacity
							style={[styles.picker, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}
							activeOpacity={0.4}
							onPress={() => this.groupPicker.togglePicker(true)}
							disabled={this.props.filters.showOnlyMySchedule}>
							<Text style={styles.pickerLabel}
								numberOfLines={1}
								ellipsizeMode="middle">
								{this.selectedGroup()}
							</Text>
							{chevronIcon}
						</TouchableOpacity>
						<RNPickerSelect
							ref={groupPicker => this.groupPicker = groupPicker}
							placeholder={{ label: 'Всі', value: null }}
							hideIcon={true}
							items={this.groupKeyValues()}
							onValueChange={value => this.setState({ groupId: value })}
							onDonePress={() => this.props.onChange({ groupId: this.state.groupId })}
							style={{ ...pickerStyle }}
							children={null}
							value={this.state.groupId || -1}
						/>
					</View>
					<View style={styles.row}>
						<Text style={[styles.label, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}>
							Викладач
						</Text>
						<TouchableOpacity
							style={[styles.picker, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}
							activeOpacity={0.4}
							onPress={() => this.teacherPicker.togglePicker(true)}
							disabled={this.props.filters.showOnlyMySchedule}>
							<Text style={styles.pickerLabel}
								numberOfLines={1}
								ellipsizeMode="middle">
								{this.selectedTeacher()}
							</Text>
							{chevronIcon}
						</TouchableOpacity>
						<RNPickerSelect
							ref={teacherPicker => this.teacherPicker = teacherPicker}
							placeholder={{ label: 'Всі', value: null }}
							hideIcon={true}
							items={this.teacherKeyValues()}
							onValueChange={value => this.setState({ teacherId: value })}
							onDonePress={() => this.props.onChange({ teacherId: this.state.teacherId })}
							style={{ ...pickerStyle }}
							children={null}
							value={this.state.teacherId || -1}
						/>
					</View>
					<View style={styles.row}>
						<Text style={[styles.label, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}>
							Предмет
						</Text>
						<TouchableOpacity
							style={[styles.picker, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}
							activeOpacity={0.4}
							onPress={() => this.subjectPicker.togglePicker(true)}
							disabled={this.props.filters.showOnlyMySchedule}>
							<Text style={styles.pickerLabel}
								numberOfLines={1}
								ellipsizeMode="middle">
								{this.selectedSubject()}
							</Text>
							{chevronIcon}
						</TouchableOpacity>
						<RNPickerSelect
							ref={subjectPicker => this.subjectPicker = subjectPicker}
							placeholder={{ label: 'Всі', value: null }}
							hideIcon={true}
							items={this.subjectKeyValues()}
							onValueChange={value => this.setState({ subjectId: value })}
							onDonePress={() => this.props.onChange({ subjectId: this.state.subjectId })}
							style={{ ...pickerStyle }}
							children={null}
							value={this.state.subjectId}
						/>
					</View>
					<View style={[styles.row, styles.lastRow]}>
						<Text style={[styles.label, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}>
							Аудиторія
						</Text>
						<TouchableOpacity
							style={[styles.picker, this.props.filters.showOnlyMySchedule ? styles.disabled : {}]}
							activeOpacity={0.4}
							onPress={() => this.auditoryPicker.togglePicker(true)}
							disabled={this.props.filters.showOnlyMySchedule}>
							<Text style={styles.pickerLabel}
								numberOfLines={1}
								ellipsizeMode="middle">
								{this.selectedAuditory()}
							</Text>
							{chevronIcon}
						</TouchableOpacity>
						<RNPickerSelect
							ref={auditoryPicker => this.auditoryPicker = auditoryPicker}
							placeholder={{ label: 'Всі', value: null }}
							hideIcon={true}
							items={this.auditoryKeyValues()}
							onValueChange={value => this.setState({ auditoryId: value })}
							onDonePress={() => this.props.onChange({ auditoryId: this.state.auditoryId })}
							style={{ ...pickerStyle }}
							children={null}
							value={this.state.auditoryId}
						/>
					</View>
				</Animated.View>
			</View>
		)
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

export default SheduleFilter
