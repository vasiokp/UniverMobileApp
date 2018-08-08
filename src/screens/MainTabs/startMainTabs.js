import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Foundation';
const startTabs = () => {
  Promise.all([
    Icon.getImageSource("torsos-all"),
    Icon.getImageSource("clipboard"),
    Icon.getImageSource("widget"),
    Icon.getImageSource("clipboard-notes")
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "UniverMobileApp.ScheduleTabScreen",
          title: "Розклад",
          label: 'Розклад',
          icon: sources[1]
        },
        {
          screen: "UniverMobileApp.FirstTabScreen",
          title: "first tab",
          label: 'First Tab',
          icon: sources[0]
        },
        {
          screen: "UniverMobileApp.SettingsTabScreen",
          title: "Settings",
          label: 'Settings',
          icon: sources[2]
        }, {
          screen: "UniverMobileApp.NewsTabScreen",
          title: "Новини",
          label: 'Новини',
          icon: sources[3]
        }
      ],
      appStyle: {
        tabBarBackgroundColor: '#de793e',
        tabBarButtonColor: '#ffffff',
        tabBarHideShadow: true,
        tabBarSelectedButtonColor: '#000000',
        tabBarTranslucent: false,
        tabFontSize: 12,
        selectedTabFontSize: 14,
      }
    })
  });
};

export default startTabs;
