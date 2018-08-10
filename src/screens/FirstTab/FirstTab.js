import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { getScheduler } from '../../store/actions/index'
import PageLayout from '../../components/UI/PageLayout/PageLayout'

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
      <PageLayout>
        <Text>First Tab Content</Text>
        <TextInput value={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
      </PageLayout>
    );
  }
}


export default FirstTabScreen;
