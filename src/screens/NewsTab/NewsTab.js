import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import NewsItem from '../../components/NewsItem/NewsItem'

class NewsTabScreen extends Component {
  ShowDetails = id => {
    this.props.navigator.push({
      screen: 'UniverMobileApp.NewsDetailsScreen',
      title: 'Новина'
      // passProps: {
      //     lesson: this.GetCurrentSchedule().find(les => {
      //         return les.Id === id
      //     })
    }
    )
  }
  render() {
    return (
      <View>
        <FlatList data={[
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
            <TouchableOpacity onPress={this.ShowDetails.bind(this, item.Id)} activeOpacity={0.7}>
              <NewsItem title={item.title} date={item.date} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default NewsTabScreen;
