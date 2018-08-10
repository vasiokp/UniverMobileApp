import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Image } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import logoImage from '../../assets/logo.png'
import { PRIMARY_COLOR, TEXT_COLOR } from '../../plugins/AppColors'
import PageLayout from '../../components/UI/PageLayout/PageLayout'

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <PageLayout>
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
      </PageLayout>
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