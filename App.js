import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Login from './src/screens/Auth/Login'
import ScheduleTab from './src/screens/ScheduleTab'
import ScheduleDetails from './src/screens/ScheduleTab/components/ScheduleDetails'
import ProfileTab from './src/screens/ProfileTab'
import Attendance from './src/screens/AttendanceTab'
import ChangePassword from './src/screens/ProfileTab/components/ChangePassword'
import NewsTabScreen from './src/screens/NewsTab/NewsTab'
import NewsDetailsScreen from './src/screens/NewsTab/NewsDetails'
import { PRIMARY_COLOR, TEXT_COLOR, DARK_PRIMARY_COLOR, SELECTED_TAB_COLOR } from './src/plugins/AppColors'
import { checkAuth } from './src/store/actions'
import moment from 'moment'
import 'moment/locale/uk'

moment.locale('uk')

import configureStore from './src/store/configureStore'

const store = configureStore()

// Register screens
Navigation.registerComponent("Login", () => Login, store, Provider)
Navigation.registerComponent("ScheduleTab", () => ScheduleTab, store, Provider)
Navigation.registerComponent("ScheduleDetails", () => ScheduleDetails, store, Provider)
Navigation.registerComponent("ProfileTab", () => ProfileTab, store, Provider)
Navigation.registerComponent("Attendance", () => Attendance, store, Provider)
Navigation.registerComponent("ChangePassword", () => ChangePassword, store, Provider)
Navigation.registerComponent("UniverMobileApp.NewsTabScreen", () => NewsTabScreen, store, Provider)
Navigation.registerComponent("UniverMobileApp.NewsDetailsScreen", () => NewsDetailsScreen)

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md'

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(iconPrefix + '-today', 28),
    Icon.getImageSource(iconPrefix + '-school', 30),
    Icon.getImageSource(iconPrefix + '-contact', 32)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "ScheduleTab",
          title: "Розклад",
          label: 'Розклад',
          icon: sources[0]
        },
        {
          screen: "UniverMobileApp.NewsTabScreen",
          title: "Новини",
          label: 'Новини',
          icon: sources[1]
        },
        {
          screen: "ProfileTab",
          title: "Профіль",
          label: 'Профіль',
          icon: sources[2]
        }
      ],
      appStyle: {
        // common
        orientation: 'portrait',
        navBarBackgroundColor: PRIMARY_COLOR,
        navBarButtonColor: '#006080',
        tabBarHideShadow: false,
        tabBarTranslucent: false,

        // Android
        tabBarBackgroundColor: PRIMARY_COLOR,
        tabBarButtonColor: TEXT_COLOR,
        tabBarSelectedButtonColor: SELECTED_TAB_COLOR,
        statusBarColor: DARK_PRIMARY_COLOR,
        navBarTitleTextCentered: true,
      },
      tabsStyle: {
        // iOS
        tabBarSelectedButtonColor: PRIMARY_COLOR,
        tabBarSelectedLabelColor: PRIMARY_COLOR
      }
    })
  })
}

const startLogin = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Login',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    portraitOnlyMode: true,
    appStyle: {
      navBarHidden: true,
      statusBarColor: DARK_PRIMARY_COLOR
    }
  })
}

store.dispatch(checkAuth()).then(() => {
  const state = store.getState()
  if (state.profile.loggedIn === true) {
    startTabs()
  } else {
    startLogin()
  }
})

export {
  startTabs,
  startLogin,
  store
}
