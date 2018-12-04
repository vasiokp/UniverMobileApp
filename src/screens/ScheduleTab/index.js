import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { Calendar, Agenda, LocaleConfig } from 'react-native-calendars'
import { connect } from 'react-redux'
import { getSchedule } from '../../store/actions/index'
// import { TEXT_COLOR, TODAY_TEXT_COLOR, PRIMARY_COLOR, BACK_COLOR, BLOCK_BORDER_COLOR } from '../../plugins/AppColors';
// import PageLayout from '../../components/UI/PageLayout/PageLayout'
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

// function GetDateString(date) {
//   return date ? date.substring(0, 10) : new Date().toISOString().substring(0, 10)
// }

class CalendarTab extends Component {
  static navigatorButtons = {
    rightButtons: [{
      title: 'Сьогодні',
      id: 'today'
      // showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
    }]
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      // selectedDate: moment(),
      // markedDay: {
      //   [GetDateString()]: { selected: true }
      // }
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
    // this.props.getSchedule(new Date().toDateString());
  }

  // onSelectDay(date) {
  //   const markedDay = { [date.dateString]: { selected: true } }
  //   this.setState({
  //     Date: date.dateString,
  //     markedDay: markedDay
  //   });
  // }

  openDetails(id) {
    this.props.navigator.push({
      screen: 'ScheduleDetails',
      title: 'Заняття',
      passProps: { id }
    })
  }

  // GetCurrentSchedule() {
  //   let result = [];
  //   if (this.props.schedule.length > 0) {
  //     this.props.schedule.map((item) => {
  //       if (GetDateString(item.date) === this.state.Date)
  //         result.push(item)
  //     })
  //   }
  //   return result;
  // }

  render() {
    const dot = {key:'vacation', color: 'red', selectedDotColor: 'blue'}
    return (
      <View style={{ flex: 1 }}>
        {/* <Calendar
          current={GetDateString()}
          onDayPress={(date) => { this.onSelectDay(date) }}
          monthFormat={'MMMM'}
          markedDates={this.state.markedDay}
          hideArrows={true}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          style={{
            borderWidth: 1,
            borderColor: BLOCK_BORDER_COLOR,
            margin:10
          }}
          theme={{
            calendarBackground: BACK_COLOR,
            textSectionTitleColor: TEXT_COLOR,
            selectedDayBackgroundColor: PRIMARY_COLOR,
            selectedDayTextColor: TEXT_COLOR,
            todayTextColor: TODAY_TEXT_COLOR,//'#de793e',
            dayTextColor: TEXT_COLOR,
            monthTextColor: PRIMARY_COLOR,
            // textDayFontFamily: 'Roboto',
            // textMonthFontFamily: 'Roboto',
            // textDayHeaderFontFamily: 'Roboto',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        /> */}
        <Agenda
          ref={agenda => this.agenda = agenda}
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={
            {'2018-12-03': [{text: 'item 1 - any js object'}],
            '2018-12-04': [{text: 'item 2 - any js object'}],
            '2018-12-05': [
              {
                lessonNumber: 1,
                subjectName: 'Диференціальні рівняння',
                teacher: 'Сопронюк Т. М.'
              }, {}, {}, {}, {}
            ],
            '2018-12-06': [{text: 'item 3 - any js object'},{text: 'any js object'}, {}],
            }}
          displayLoadingIndicator={false}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {console.log('month loading', month)}}
          // callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // callback that gets called on day press
          firstDay={1}
          onDayPress={(day)=>{console.log('day pressed')}}
          // callback that gets called when day changes while scrolling agenda list
          onDayChange={(day)=>{console.log('day changed')}}
          // current={this.state.selectedDate.format(dateFormat)}
          // selected={this.state.selectedDate.format(dateFormat)}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => (
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.openDetails(item.id)}>
              <ScheduleItem {...item} />
            </TouchableOpacity>
          )}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => day ? <ScheduleDay day={day} /> : null}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {return (<View />);}}
          // specify what should be rendered instead of ActivityIndicator
          //renderEmptyData = {() => {return (<View />);}}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // markedDates={{
          //   '2018-12-04': {dots: [dot]},
          //   '2018-12-05': {marked: true},
          //   '2012-05-18': {disabled: true}
          // }}
          // markingType={'multi-dot'}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // agenda theme
          theme={{
            selectedDayBackgroundColor: '#F89554',
            todayTextColor: '#F89554',
            // backgroundColor: 'rgba(255, 255, 255, 0.7)',
            textMonthFontWeight: 'bold',
            dotColor: '#F89554',
            // agendaDayTextColor: 'yellow',
            // agendaDayNumColor: 'green',
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
    getSchedule: (date) => dispatch(getSchedule(date))
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.scheduleState,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTab)
