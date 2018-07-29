import React, { Component } from 'react';
import { View, FlatList, StyleSheet,Text } from 'react-native';
import ListItem from '../../components/ListItem/ListItem'

class NewsTabScreen extends Component {
    render() {
        return (
            <View style={styles.page}>
                <FlatList style={styles.list}
                    // keyExtractor={item => item.date}
                    data={[
                        {
                            title: 'У ЧНУ першокурсників посвятили у студенти.',
                            date: '07-09-2018',
                            key: "1"
                        },
                        {
                            title: 'Гроші, хабарі та дівчата.До чого тут я?',
                            date: '17-05-2018',
                            key: "2"
                        },
                        {
                            title: 'Хто забув флешку з курсачом?',
                            date: '01-04-2018',
                            key: "3"
                        },
                        {
                            title: 'Хто забув флешку з курсачом?',
                            date: '01-04-2018',
                            key: "5"
                        },
                        {
                            title: 'Хто забув флешку з курсачом?',
                            date: '01-04-2018',
                            key: "6"
                        },
                        {
                            title: 'Викладачі хочу відпустки.',
                            date: '21-01-2018',
                            key: "4"
                        }]}
                    renderItem={({ item }) => (
                         // <Text>{item.title}</Text>
                        <ListItem title={item.title} date={item.date}/>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // page: {
    //     backgroundColor:'green',
    //     height: '100%'

    // },
    // list: {
    //     backgroundColor:'blue',
    //     height: '70%'
    // }
})

export default NewsTabScreen;
