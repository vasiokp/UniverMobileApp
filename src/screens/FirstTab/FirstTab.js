import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { getScheduler } from '../../store/actions/index'

class FirstTabScreen extends Component {
  state = {
    placeName: '',
    date: ''
  }
  placeNameChangedHandler = (event) => {
    this.setState({
      placeName: event
    })
  }

  componentDidMount(){
    this.props.getTable(new Date());
  }

  render() {
    const list = this.props.schedule.map(function(item){
      return (<View><Text>{item.LessonNumber}</Text><Text>{item.Teacher.Name}</Text></View>)
    })
    return (
      <View>
        <Text>First Tab Content</Text>
        {list}
        <TextInput value={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTable: (date) => dispatch(getScheduler(date))
  };
};

const mapStateToProps = state => {
  return {
    schedule: state.scheduleState.Lessons,
    foo: state
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstTabScreen);
