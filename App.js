import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
// import { DARK_PRIMARY_COLOR } from "./src/plugins/AppColors"
import AuthScreen from './src/screens/Auth/Auth'
import ScheduleTab from './src/screens/ScheduleTab'
import CalendarTab from './src/screens/CalendarTab'
import LessonDetailsScreen from './src/screens/CalendarTab/LessonDetails'
import SettingsTabScreen from './src/screens/SettingsTab/SettingsTab'
import NewsTabScreen from './src/screens/NewsTab/NewsTab'
import NewsDetailsScreen from './src/screens/NewsTab/NewsDetails'
import startMainTabs from './src/screens/MainTabs/startMainTabs'

import configureStore from './src/store/configureStore'

const store = configureStore();

// Register screens
Navigation.registerComponent("UniverMobileApp.AuthScreen", () => AuthScreen) //, store, Provider);
Navigation.registerComponent("ScheduleTab", () => ScheduleTab, store, Provider)
Navigation.registerComponent("CalendarTab", () => CalendarTab, store, Provider)
Navigation.registerComponent("UniverMobileApp.LessonDetailsScreen", () => LessonDetailsScreen) //, store, Provider);
Navigation.registerComponent("UniverMobileApp.SettingsTabScreen", () => SettingsTabScreen, store, Provider)
Navigation.registerComponent("UniverMobileApp.NewsTabScreen", () => NewsTabScreen, store, Provider)
Navigation.registerComponent("UniverMobileApp.NewsDetailsScreen", () => NewsDetailsScreen) //, store, Provider);

startMainTabs()
// Start a app
// Navigation.startSingleScreenApp({
//   screen: {
//     screen: "UniverMobileApp.AuthScreen",
//     navigatorStyle: {
//       navBarHidden: true,
//       statusBarColor:DARK_PRIMARY_COLOR
//     }
//   }
// });