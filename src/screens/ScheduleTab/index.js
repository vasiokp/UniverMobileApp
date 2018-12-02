import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getSchedule, getExtraSchedule } from '../../store/actions/index'
import moment from 'moment'
import LoadingView from '../../components/UI/LoadingView'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ScheduleList from './components/ScheduleList'

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
