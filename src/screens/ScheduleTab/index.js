import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getSchedule, getExtraSchedule } from '../../store/actions/index'
// import { TEXT_COLOR, TODAY_TEXT_COLOR, PRIMARY_COLOR, BACK_COLOR, BLOCK_BORDER_COLOR } from '../../plugins/AppColors';
import moment from 'moment'
import LoadingView from '../../components/UI/LoadingView'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ScheduleList from './components/ScheduleList'

// function GetDateString(date) {
//   return date ? date.substring(0, 10) : new Date().toISOString().substring(0, 10)
// }

class ScheduleTabScreen extends Component {
  constructor() {
    super();
    // this.state = {
    //   Date: GetDateString(),
    //   markedDay: {
    //     [GetDateString()]: { selected: true }
    //   }
    // }
  }

  getSchedule = (refresh = false) => {
    const date = moment()
    const start = date.format('YYYY-MM-DD')
    date.add(5 - date.day(), 'd')
    const end = date.format('YYYY-MM-DD')
    this.props.getSchedule(start, end, refresh)
  }

  refresh = () => {
    this.getSchedule(true)
  }

  openDetails = id => {
    this.props.navigator.push({
      screen: 'ScheduleDetails',
      title: 'Заняття',
      passProps: {
        // item: this.GetCurrentSchedule().find(les => {
        //   return les.id === id
        // })
      }
    })
  }

  componentDidMount() {
    this.getSchedule()
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
    return (
      <PageLayout>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', height: '100%'}}>
          { this.props.schedule.loaded ?
            <ScheduleList
              schedule={this.props.schedule}
              refresh={this.refresh}
              getMore={this.props.getExtraSchedule}
              openDetails={this.openDetails}>
            </ScheduleList> :
            <LoadingView /> }
        </View>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSchedule: (start, end, refresh) => dispatch(getSchedule(start, end, refresh)),
    getExtraSchedule: () => dispatch(getExtraSchedule())
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTabScreen)
