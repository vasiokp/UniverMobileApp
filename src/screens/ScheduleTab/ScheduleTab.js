import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { getScheduler } from '../../store/actions/index'
import { TEXT_COLOR, TODAY_TEXT_COLOR, PRIMARY_COLOR, BACK_COLOR, BLOCK_BORDER_COLOR } from '../../plugins/AppColors';
import Table from '../../components/Table/Table'
import PageLayout from '../../components/UI/PageLayout/PageLayout'

function GetDateString(date) {
  return date ? date.substring(0, 10) : new Date().toISOString().substring(0, 10)
}

class ScheduleTabScreen extends Component {
  constructor() {
    super();
    this.state = {
      Date: GetDateString(),
      markedDay: {
        [GetDateString()]: { selected: true }
      }
    }
  }

  componentDidMount() {
    this.props.getSchedule(new Date().toDateString());
  }

  onSelectDay(date) {
    const markedDay = { [date.dateString]: { selected: true } }
    this.setState({
      Date: date.dateString,
      markedDay: markedDay
    });
  }

  ShowDetails = id => {
    this.props.navigator.push({
      screen: 'UniverMobileApp.LessonDetailsScreen',
      title: 'Заняття',
      passProps: {
        item: this.GetCurrentSchedule().find(les => {
          return les.id === id
        })
      }
    })
  }

  GetCurrentSchedule() {
    let result = [];
    if (this.props.schedule.length > 0) {
      this.props.schedule.map((item) => {
        if (GetDateString(item.date) === this.state.Date)
          result.push(item)
      })
    }
    return result;
  }

  render() {
    return (
      <PageLayout>
        <View style={{ flex: 1 }}>
          <Calendar
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
              textDayFontFamily: 'Roboto',
              textMonthFontFamily: 'Roboto',
              textDayHeaderFontFamily: 'Roboto',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
          <View style={{ flex: 2 }}>
            <Table
              HeaderColumns={[{ Text: '№', Width: 27 }, { Text: 'Предмет', Width: '57%' }, { Text: 'Аудиторія',Width:'35%' }]}
              HeaderHeight={33}
              DisplayFields={['lessonNumber', 'name', 'auditoryName']}
              Items={this.GetCurrentSchedule()}
              RowHeight={33}
              onItemPressed={this.ShowDetails}
            />
          </View>
        </View>
      </PageLayout>
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
