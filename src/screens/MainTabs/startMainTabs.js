import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Foundation';
const startTabs = () => {
    Promise.all([
        Icon.getImageSource("torsos-all"),
        Icon.getImageSource("clipboard"),
        Icon.getImageSource("widget")
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "UniverMobileApp.FirstTabScreen",
                    title: "first tab",
                    label: 'First Tab',
                    icon: sources[0]
                },
                {
                    screen: "UniverMobileApp.SecondTabScreen",
                    title: "second tab",
                    label: 'Second Tab 2',
                    icon: sources[1]
                },                {
                    screen: "UniverMobileApp.SettingsTabScreen",
                    title: "Settings",
                    label: 'Settings',
                    icon: sources[2]
                }
            ]
        })
    });
};

export default startTabs;
