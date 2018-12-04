import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR, TEXT_COLOR, DARK_PRIMARY_COLOR, SELECTED_TAB_COLOR } from "../../plugins/AppColors"

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md'
const iconSize = 28

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(iconPrefix + '-today', iconSize),
    Icon.getImageSource(iconPrefix + '-calendar', iconSize),
    Icon.getImageSource(iconPrefix + '-school', iconSize),
    Icon.getImageSource(iconPrefix + '-cog', iconSize)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "ScheduleTab",
          title: "Розклад",
          label: 'Розклад',
          icon: sources[0]
        },
        // {
        //   screen: "CalendarTab",
        //   title: "Календар",
        //   label: 'Календар',
        //   icon: sources[1]
        // },
        {
          screen: "UniverMobileApp.NewsTabScreen",
          title: "Новини",
          label: 'Новини',
          icon: sources[2]
        }, {
          screen: "UniverMobileApp.SettingsTabScreen",
          title: "Налаштування",
          label: 'Налаштування',
          icon: sources[3]
        }
      ],
      appStyle: {
        // common
        orientation: 'portrait',
        navBarBackgroundColor: PRIMARY_COLOR,
        // navBarButtonColor: '#555',
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
  });
};

export default startTabs;
