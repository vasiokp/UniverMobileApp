import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import FirstTabScreen from './src/screens/FirstTab/FirstTab';
import SecondTabScreen from './src/screens/SecondTab/SecondTab';
import SettingsTabScreen from './src/screens/SettingsTab/SettingsTab';
import NewsTabScreen from './src/screens/NewsTab/NewsTab';

import configureStore from './src/store/configureStore';

const store = configureStore();

// Register screens
Navigation.registerComponent("UniverMobileApp.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.FirstTabScreen", () => FirstTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.SecondTabScreen", () => SecondTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.SettingsTabScreen", () => SettingsTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.NewsTabScreen", () => NewsTabScreen, store, Provider);

// Start a app
Navigation.startSingleScreenApp({
  screen: {
    screen: "UniverMobileApp.AuthScreen",
    navigatorStyle: {
      navBarHidden: true
    }
  }
});