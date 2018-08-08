import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { getScheduler } from '../../store/actions/index'
import backgroundImage from '../../assets/backgroundImage.png'
import Schedule from '../../components/ScheduleItem/ScheduleItem'
import _ from 'underscore'

class ScheduleTabScreen extends Component {
  constructor() {
    super();
    this.state = {
      Date: new Date().toISOString().substring(0, 10),
      markedDay: {
        [new Date().toISOString().substring(0, 10)]: { selected: true }
      }
    }
  }
  componentDidMount() {
    this.props.getSchedule(new Date().toDateString());
  }
  onSelectDay(date) {
    console.log('selected day', date.dateString);
    const markedDay = { [date.dateString]: { selected: true } }
    this.setState({
      Date: date.dateString,
      markedDay: markedDay
    });
  }
  GetCurrentSchedule() {
    if (this.props.schedule.length > 0) {
      const res = _.find(this.props.schedule, (item) => {
        return item.Date === this.state.Date
      })
      return res ? res.Lessons : []
    }
    return []
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} resizeMode="stretch" style={{ width: '100%', height: '100%' }}>
        <View style={{ flex: 1 }}>
          <Calendar
            current={'2018-08-10'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(date) => { this.onSelectDay(date) }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => { console.log('selected day2', day) }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM'}
            markedDates={this.state.markedDay}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            //onMonthChange={(month) => { console.log('month changed', month) }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            //renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            //hideDayNames={true}
            // Show week numbers to the left. Default = false
            //showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            //onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            //onPressArrowRight={addMonth => addMonth()}
            style={{
              borderWidth: 1,
              borderColor: '#ffffff',
            }}
            theme={{
              //backgroundColor: '#ffffff',
              calendarBackground: 'rgba(135, 135, 135, 0.6)',
              textSectionTitleColor: '#ffffff',
              selectedDayBackgroundColor: '#de793e',
              selectedDayTextColor: '#ffffff',
              todayTextColor: 'yellow',//'#de793e',
              dayTextColor: '#ffffff',
              textDisabledColor: '#d9e1e8',
              //arrowColor: 'orange',
              monthTextColor: '#de793e',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
          <View style={{ flex: 2 }}>
            <Schedule Items={this.GetCurrentSchedule()} TextColor='#ffffff' BackgroundColor='rgba(135, 135, 135, 0.6)' />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSchedule: (date) => dispatch(getScheduler(date))
  };
};

const mapStateToProps = state => {
  return {
    schedule: state.scheduleState,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTabScreen);
