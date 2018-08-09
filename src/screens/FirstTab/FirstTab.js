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
    console.log('first Tab')
    //this.props.getTable(new Date());
  }

  render() {

    return (
      <View>
        <Text>First Tab Content</Text>
        <TextInput value={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
      </View>
    );
  }
}


export default FirstTabScreen;
