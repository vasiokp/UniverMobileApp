import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Image } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import backgroundImage from '../../assets/backgroundImage.png'
import logoImage from '../../assets/logo.png'
import { PRIMARY_COLOR, TEXT_COLOR } from '../../plugins/AppColors'
class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} resizeMode="stretch" style={{ width: '100%', height: '100%' }}>
        <View style={styles.page}>
          <Image source={logoImage} style={styles.logoImageStyle} resizeMode="stretch" />
          <View style={styles.body}>
            <TextInput placeholder="Email або телефон"
              placeholderTextColor={TEXT_COLOR}
              underlineColorAndroid={TEXT_COLOR}
              style={styles.input} />
            <TextInput placeholder="Пароль"
              textContentType="password"
              secureTextEntry={true}
              placeholderTextColor={TEXT_COLOR}
              underlineColorAndroid={TEXT_COLOR}
              style={styles.input} />
            <Button title="Увійти" onPress={this.loginHandler} color={PRIMARY_COLOR} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  logoImageStyle: {
    height: 30,
    width: 140
  },
  page: {
    alignItems: 'center',
    marginTop: 10
  },
  body: {
    justifyContent: 'flex-end',
    width: '80%',
    height: '75%'
  },
  input: {
    color: TEXT_COLOR,
    height: 50,
    fontSize: 24
  }
});

export default AuthScreen;