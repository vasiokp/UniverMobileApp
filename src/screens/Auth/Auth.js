import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <View>
        <Text>Email</Text>
        <TextInput></TextInput>
        <Text>Password</Text>
        <TextInput></TextInput>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    );
  }
}

export default AuthScreen;