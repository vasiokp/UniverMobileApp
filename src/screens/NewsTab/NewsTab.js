import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { getNews, getImage } from '../../store/actions/index'
import NewsItem from '../../components/NewsItem/NewsItem'
import PageLayout from '../../components/UI/PageLayout/PageLayout'

class NewsTabScreen extends Component {
  ShowDetails = item => {
    this.props.navigator.push({
      screen: 'UniverMobileApp.NewsDetailsScreen',
      title: 'Подробиці',
      passProps: {
        ...item
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
    this.props.getNews().then(() => {
      this.props.news.items.forEach(item => {
        this.props.getImage(item.Id)
      })
    })
  }

  render() {
    console.log(this.props.news.items)
    return (
      <PageLayout>
        <FlatList data={this.props.news.items}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
          keyExtractor={item => item.Id.toString()}
          onRefresh={() => this.props.getNews(true).then(() => {
            this.props.news.items.forEach(item => {
              this.props.getImage(item.Id)
            })
          })}
          refreshing={this.props.news.refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={this.ShowDetails.bind(this, item)} activeOpacity={0.7}>
              <NewsItem {...item} />
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
    getNews: () => dispatch(getNews()),
    getImage: (newId, refresh = false) => dispatch(getImage(newId, refresh))
  }
}

const mapStateToProps = state => {
  return {
    news: state.news,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsTabScreen)

