import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { getNews } from '../../store/actions/index'

import NewsItem from '../../components/NewsItem/NewsItem'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import image from '../../assets/t1.png'

class NewsTabScreen extends Component {
  ShowDetails = id => {
    this.props.navigator.push({
      screen: 'UniverMobileApp.NewsDetailsScreen',
      title: 'Новина',
      passProps: {
          news: this.props.news.items[id]
    }
  })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "transparent",
        }}
      />
    );
  }
  componentDidMount () {
    this.props.getNews()
  }
  keyExtractor = (item, index) => 'news-'+index

  render() {
    return (
      <PageLayout>
        <FlatList data={this.props.news.items}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={this.ShowDetails.bind(this, index)} activeOpacity={0.7}>
              <NewsItem title={item.Title} date={item.Date} imgSource={image} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
        />
      </PageLayout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(getNews())
  }
}

const mapStateToProps = state => {
  return {
    news: state.news,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsTabScreen)

