import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { DARK_PRIMARY_COLOR } from "./src/plugins/AppColors";
import AuthScreen from './src/screens/Auth/Auth';
import FirstTabScreen from './src/screens/FirstTab/FirstTab';
import ScheduleTabScreen from './src/screens/ScheduleTab/ScheduleTab';
import LessonDetailsScreen from './src/screens/ScheduleTab/LessonDetails';
import SettingsTabScreen from './src/screens/SettingsTab/SettingsTab';
import NewsTabScreen from './src/screens/NewsTab/NewsTab';
import NewsDetailsScreen from './src/screens/NewsTab/NewsDetails';

import configureStore from './src/store/configureStore';

const store = configureStore();

// Register screens
Navigation.registerComponent("UniverMobileApp.AuthScreen", () => AuthScreen); //, store, Provider);
Navigation.registerComponent("UniverMobileApp.FirstTabScreen", () => FirstTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.ScheduleTabScreen", () => ScheduleTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.LessonDetailsScreen", () => LessonDetailsScreen); //, store, Provider);
Navigation.registerComponent("UniverMobileApp.SettingsTabScreen", () => SettingsTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.NewsTabScreen", () => NewsTabScreen, store, Provider);
Navigation.registerComponent("UniverMobileApp.NewsDetailsScreen", () => NewsDetailsScreen); //, store, Provider);

// Start a app
Navigation.startSingleScreenApp({
  screen: {
    screen: "UniverMobileApp.AuthScreen",
    navigatorStyle: {
      navBarHidden: true,
      statusBarColor:DARK_PRIMARY_COLOR
    }
  }
});