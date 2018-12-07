import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { connect } from 'react-redux'
import { fetchSchedule, updateSchedule, fetchScheduleTypes } from '../../store/actions/index'
import moment from 'moment'
import ScheduleDay from './components/ScheduleDay'
import ScheduleItem from './components/ScheduleItem'

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
  return {
    monday: moment(date).add(-moment().day() + 1, 'd'),
    sunday: moment(date).add(7 - moment().day(), 'd')
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
      selectedDate: moment().format(dateFormat)
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'today') {
        this.agenda.chooseDay(moment().format(dateFormat))
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
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  openDetails(item) {
    this.props.navigator.push({
      screen: 'ScheduleDetails',
      title: 'Подробиці',
      passProps: { passedItem: item }
    })
  }

  loadItems(date) {
    if (!this.props.schedule.items[date.dateString]) {
      const weekEdges = getWeekEdges(date.timestamp)
      this.props.fetchSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat))
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
    }
  }

  refreshItems() {
    const weekEdges = getWeekEdges(this.state.selectedDate)
    this.props.fetchSchedule(weekEdges.monday.format(dateFormat), weekEdges.sunday.format(dateFormat), true)
    this.props.updateSchedule()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          ref={agenda => this.agenda = agenda}
          items={this.props.schedule.items}
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
          renderItem={(item, firstItemInDay) => (
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.openDetails(item)}>
              <ScheduleItem {...item} />
            </TouchableOpacity>
          )}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => day ? <ScheduleDay day={day} /> : null}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={emptyDate}
          // specify what should be rendered instead of ActivityIndicator
          //renderEmptyData = {() => {return (<View />);}}
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
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSchedule: (start, end, refresh = false) => dispatch(fetchSchedule(start, end, refresh)),
    updateSchedule: () => dispatch(updateSchedule()),
    fetchScheduleTypes: (refresh = false) => dispatch(fetchScheduleTypes(refresh))
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule,
    scheduleTypes: state.scheduleTypes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTab)
