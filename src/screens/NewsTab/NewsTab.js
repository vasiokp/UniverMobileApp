import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux'
import { getNews, getImage } from '../../store/actions/index'
import NewsItem from '../../components/NewsItem/NewsItem'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import NewsFilter from './NewsFilter'
import {
  setNewsFilters,
  fetchNewsTypes
} from '../../store/actions'
import Icon from 'react-native-vector-icons/Ionicons'

const noFilterMessage = () => (
  <View style={{
    alignItems: 'center',
    marginTop: 30
  }}>
    <Text style={{
      fontWeight: '300',
      color: '#555'
    }}>
      Застосуйте хоча б один фільтр
    </Text>
  </View>
)

class NewsTabScreen extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      showFilter: false
    }
    Icon.getImageSource((Platform.OS === 'ios' ? 'ios' : 'md') + '-options', 28).then(icon => {
      this.props.navigator.setButtons({
        leftButtons: [{
          id: 'filter',
          icon: icon
        }]
      })
      //fix for android: incorrect recalculation of width, when set left buttons
      this.props.navigator.setStyle({ navBarTitleTextCentered: true });
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      switch (event.id) {
        case 'filter':
          this.toggleFilter()
          return
        default:
          return
      }
    }
  }

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
    this.props.fetchNewsTypes()
    this.props.getNews().then(() => {
      this.props.news.items.forEach(item => {
        this.props.getImage(item.Id)
      })
    })
  }

  toggleFilter() {
    if (this.state.showFilter) {
      this.filter.hide()
      this.setState({ showFilter: false })
    } else {
      this.filter.show()
      this.setState({ showFilter: true })
    }
  }

  refreshItems() {
    this.props.fetchNewsTypes(true)
    this.props.getNews().then(() => {
      this.props.news.items.forEach(item => {
        this.props.getImage(item.Id)
      })
    })
  }


  mergedItems() {
    const filters = this.props.news.filters
    if (this.allFiltersAreNull()) return this.props.news.items
    let filteredItems = []
    Object.keys(this.props.news.items).forEach(key => {
      if (filters.newsTypeId == null || this.props.news.items[key].NewsTypeId === filters.newsTypeId) {
        filteredItems.push(this.props.news.items[key])
      }
    })
    return filteredItems
  }

  allFiltersAreNull() {
    return (
      this.props.news.filters.newsTypeId == null
    )
  }

  render() {
    console.log(this.props.news.items)
    return (
      <View>
        <PageLayout>
          <FlatList data={this.mergedItems()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}

            keyExtractor={item => item.Id ? item.Id.toString() : ""}

            onRefresh={() => this.props.getNews(true).then(() => {
              let list = this.props.news.items
              list.forEach(item => {
                this.props.getImage(item.Id)
              })
            })}
            renderEmptyData={this.allFiltersAreNull() ? noFilterMessage : null}
            onRefresh={() => this.refreshItems()}
            refreshing={this.props.news.refreshing}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.ShowDetails.bind(this, item)} activeOpacity={0.7}>
                <NewsItem {...item} />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
          />
          
        </PageLayout>
        <NewsFilter
            ref={filter => this.filter = filter}
            newsTypes={this.props.newsTypes.items}
            filters={this.props.news.filters}
            onClose={() => this.setState({ showFilter: false })}
            onChange={filters => this.props.setNewsFilters(filters)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(getNews()),
    getImage: (newId, refresh = false) => dispatch(getImage(newId, refresh)),
    setNewsFilters: filters => dispatch(setNewsFilters(filters)),
    fetchNewsTypes: (refresh = false) => dispatch(fetchNewsTypes(refresh)),
  }
}

const mapStateToProps = state => {
  return {
    news: state.news,
    newsTypes: state.newsTypes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsTabScreen)

