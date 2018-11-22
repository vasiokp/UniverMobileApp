import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
// import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import { getSchedule } from '../../store/actions/index'
// import { TEXT_COLOR, TODAY_TEXT_COLOR, PRIMARY_COLOR, BACK_COLOR, BLOCK_BORDER_COLOR } from '../../plugins/AppColors';
import Table from '../../components/Table/Table'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ScheduleList from './components/ScheduleList'

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
        <ScheduleList data={this.props.schedule}></ScheduleList>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSchedule: date => dispatch(getSchedule(date))
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTabScreen)
