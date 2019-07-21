import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  fetchSchedule,
  fetchAllSchedule,
  updateSchedule,
  fetchScheduleTypes,
  clearScheduleDetails,
  setScheduleFilters,
  fetchGroups,
  fetchSpecialties,
  fetchTeachers,
  fetchSubjects,
  fetchAuditories
} from '../../store/actions'
import * as userRoles from '../../plugins/userRoles'
import moment from 'moment'
import ScheduleDay from './components/ScheduleDay'
import ScheduleItem from './components/ScheduleItem'
import ScheduleFilter from './components/ScheduleFilter'
import { groupBy } from '../../utils'

LocaleConfig.locales['uk'] = {
  monthNames: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
  monthNamesShort: ['Січ.','Лют.','Берез.','Квіт.','Трав.','Черв.','Лип.','Серп.','Верес.','Жовт.','Листоп.','Груд.'],
  dayNames: ['Неділя','Понеділок','Вівторок','Середа','Четвер','П‘ятниця','Субота'],
  dayNamesShort: ['Нд.','Пн.','Вт.','Ср.','Чт.','Пт.','Сб.']
}

LocaleConfig.defaultLocale = 'uk'

const dateFormat = 'YYYY-MM-DD'

const refreshInterval = 30000 // 30 seconds

const getWeekEdges = date => {
  const day = moment().day() || 7
  return {
    monday: moment(date).add(-day + 1, 'd'),
    sunday: moment(date).add(7 - day, 'd')
  }
}

const emptyDate = () => (
  <View style={{
    height: 60,
    paddingLeft: 20,
    paddingTop: 10
  }}>
    <Text style={{
      color: '#bbb',
      fontWeight: '300'
    }}>
      Немає занять
    </Text>
  </View>
)

const noFilterMessage = () => (
  <View style={{
    alignItems: 'center',
    marginTop: 30
  }}>
    <Text style={{
      fontWeight: '300',
      color: '#555'
    }}>
      Застосуйте хоча б один фільтр
    </Text>
  </View>
)

class ScheduleTab extends Component {
  static navigatorButtons = {
    rightButtons: [{
      title: 'Сьогодні',
      id: 'today'
    }]
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      selectedDate: moment().format(dateFormat),
      showFilter: false
    }
    Icon.getImageSource((Platform.OS === 'ios' ? 'ios' : 'md') + '-options', 28).then(icon => {
      this.props.navigator.setButtons({
        ...ScheduleTab.navigatorButtons,
        leftButtons: [{
          id: 'filter',
          icon: icon
        }]
      })
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      switch (event.id) {
        case 'today':
          this.agenda.chooseDay(moment().format(dateFormat))
          return
        case 'filter':
          this.toggleFilter()
          return
        default:
          return
      }
    }
  }

  componentDidMount() {
    this.agenda.chooseDay(moment().format(dateFormat))
    this.props.fetchScheduleTypes()
    const intervalId = setInterval(() => {
      this.props.updateSchedule()
    }, refreshInterval)
    this.setState({ intervalId })
    this.props.setScheduleFilters({
      groupId: this.props.profile.userRole === userRoles.STUDENT ? this.props.profile.userInfo.GroupId : null,
      teacherId: this.props.profile.userRole === userRoles.TEACHER ? this.props.profile.userInfo.Id : null
    })
    this.props.fetchGroups()
    this.props.fetchSpecialties()
    this.props.fetchTeachers()
    this.props.fetchSubjects()
    this.props.fetchAuditories()
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  openDetails(item) {
    this.props.clearScheduleDetails().then(() => {
      this.props.navigator.push({
        screen: 'ScheduleDetails',
        title: 'Подробиці',
        passProps: { passedItem: item }
      })
    })
  }

  toggleFilter() {
    if (this.state.showFilter) {
      this.filter.hide()
      this.setState({ showFilter: false })
    } else {
      this.filter.show()
      this.setState({ showFilter: true })
    }
  }

  loadItems(date) {
    if (date != undefined) {
      if (!this.props.schedule.items[date.dateString]) {
        const weekEdges = getWeekEdges(date.timestamp)
        this.props.fetchSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat))
        this.props.fetchAllSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat))
      }
    }
  }

  dayChanged(date) {
    this.setState({
      selectedDate: date.dateString
    })
    const futureDate = moment(date.timestamp).add(3, 'd')
    if (!this.props.schedule.items[futureDate.format(dateFormat)]) {
      const weekEdges = getWeekEdges(futureDate)
      this.props.fetchSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat))
      this.props.fetchAllSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat))
    }
  }

  refreshItems() {
    const weekEdges = getWeekEdges(this.state.selectedDate)
    this.props.fetchSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat), true)
    this.props.fetchAllSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat), true)
    this.props.updateSchedule()
    this.props.fetchGroups(true)
    this.props.fetchSpecialties(true)
    this.props.fetchTeachers(true)
    this.props.fetchSubjects(true)
    this.props.fetchAuditories(true)
  }

  mergedItems() {
    const filters = this.props.schedule.filters
    if (filters.showOnlyMySchedule) {
      if (this.props.profile.userRole === userRoles.STUDENT) {
        return this.props.schedule.items
      }
      let items = {}
      Object.keys(this.props.schedule.items).forEach(key => {
        const groups = groupBy(this.props.schedule.items[key], 'LessonNumber')
        items[key] = Object.keys(groups).map(g => {
          return {
            ...(groups[g][0] || []),
            subSchedules: groups[g]
          }
        })
      })
      return items
    } else {
      if (this.allFiltersAreNull()) return {}
      let filteredItems = {}
      Object.keys(this.props.schedule.all).forEach(key => {
        filteredItems[key] = this.props.schedule.all[key].filter(item => (
          (filters.groupId == null || item.GroupId === filters.groupId) &&
          (filters.teacherId == null || item.TeacherId === filters.teacherId) &&
          (filters.subjectId == null || item.SubjectId === filters.subjectId) &&
          (filters.auditoryId == null || item.AuditoryId === filters.auditoryId)
        ))
      })
      return filteredItems
    }
  }

  allFiltersAreNull() {
    return (
      this.props.schedule.filters.groupId == null &&
      this.props.schedule.filters.teacherId == null &&
      this.props.schedule.filters.subjectId == null &&
      this.props.schedule.filters.auditoryId == null
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          ref={agenda => this.agenda = agenda}
          items={this.mergedItems()}
          displayLoadingIndicator={false}
          firstDay={1}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={month => this.loadItems(month)}
          // callback that fires when the calendar is opened or closed
          // onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // callback that gets called on day press
          onDayPress={day => this.dayChanged(day)}
          // callback that gets called when day changes while scrolling agenda list
          onDayChange={day => this.dayChanged(day)}
          // current={this.state.selectedDate.format(dateFormat)}
          // selected={this.state.selectedDate.format(dateFormat)}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            const lesson = {
              ...item,
              userRole: this.props.profile.userRole,
              isMyLesson: this.props.profile.userRole === userRoles.STUDENT ?
                item.GroupId === this.props.profile.userInfo.GroupId :
                this.props.profile.userRole === userRoles.TEACHER ?
                item.TeacherId === this.props.profile.userInfo.Id :
                false
            }
            return (
              <TouchableOpacity activeOpacity={0.4} onPress={() => this.openDetails(lesson)}>
                <ScheduleItem {...lesson} />
              </TouchableOpacity>
            )
          }}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => day ? <ScheduleDay day={day} /> : null}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={emptyDate}
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData={this.allFiltersAreNull() ? noFilterMessage : null}
          // specify your item comparison function for increased performance
          rowHasChanged={(i1, i2) => true}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // markedDates={{
          //   '2018-12-04': {dots: [dot]},
          //   '2018-12-05': {marked: true},
          //   '2012-05-18': {disabled: true}
          // }}
          // markingType={'multi-dot'}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => this.refreshItems()}
          // Set this true while waiting for new data from a refresh
          refreshing={this.props.schedule.refreshing}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // agenda theme
          theme={{
            selectedDayBackgroundColor: '#F89554',
            todayTextColor: '#F89554',
            textMonthFontWeight: 'bold',
            dotColor: '#F89554',
            agendaTodayColor: '#F89554',
            'stylesheet.agenda.list': {
              container: {
                flexDirection: 'column'
              }
            }
          }}
          // agenda container style
          style={{
            // height: '100%'
          }}
        />
        <ScheduleFilter
          ref={filter => this.filter = filter}
          userRole={this.props.profile.userRole}
          groups={this.props.groups.items}
          specialties={this.props.specialties.items}
          teachers={this.props.teachers.items}
          subjects={this.props.subjects.items}
          auditories={this.props.auditories.items}
          filters={this.props.schedule.filters}
          onClose={() => this.setState({ showFilter: false })}
          onChange={filters => this.props.setScheduleFilters(filters)}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSchedule: (start, end, refresh = false) => dispatch(fetchSchedule(start, end, refresh)),
    fetchAllSchedule: (start, end, refresh = false) => dispatch(fetchAllSchedule(start, end, refresh)),
    updateSchedule: () => dispatch(updateSchedule()),
    fetchScheduleTypes: (refresh = false) => dispatch(fetchScheduleTypes(refresh)),
    clearScheduleDetails: () => dispatch(clearScheduleDetails()),
    setScheduleFilters: filters => dispatch(setScheduleFilters(filters)),
    fetchGroups: (refresh = false) => dispatch(fetchGroups(refresh)),
    fetchSpecialties: (refresh = false) => dispatch(fetchSpecialties(refresh)),
    fetchTeachers: (refresh = false) => dispatch(fetchTeachers(refresh)),
    fetchSubjects: (refresh = false) => dispatch(fetchSubjects(refresh)),
    fetchAuditories: (refresh = false) => dispatch(fetchAuditories(refresh))
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule,
    scheduleTypes: state.scheduleTypes,
    groups: state.groups,
    specialties: state.specialties,
    teachers: state.teachers,
    subjects: state.subjects,
    auditories: state.auditories,
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTab)
