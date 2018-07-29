import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import FirstTabScreen from './src/screens/FirstTab/FirstTab';
import SecondTabScreen from './src/screens/SecondTab/SecondTab';
import SettingsTabScreen from './src/screens/SettingsTab/SettingsTab';
import NewsTabScreen from './src/screens/NewsTab/NewsTab';

// Register screens
Navigation.registerComponent("UniverMobileApp.AuthScreen", () => AuthScreen);
Navigation.registerComponent("UniverMobileApp.FirstTabScreen", () => FirstTabScreen);
Navigation.registerComponent("UniverMobileApp.SecondTabScreen", () => SecondTabScreen);
Navigation.registerComponent("UniverMobileApp.SettingsTabScreen", () => SettingsTabScreen);
Navigation.registerComponent("UniverMobileApp.NewsTabScreen", () => NewsTabScreen);

// Start a app
Navigation.startSingleScreenApp({
  screen: {
    screen: "UniverMobileApp.AuthScreen",
    navigatorStyle: {
      navBarHidden: true
    }
  }
});