import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux'
import { getInfoMessages } from '../../store/actions/index'
import PageLayout from '../../components/UI/PageLayout/PageLayout'

class InfoTab extends Component {

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
    this.props.getInfoMessages()
  }

  render() {
    return (
      <View>
        <FlatList data={this.props.infoMessages.items}
          keyExtractor={item => item.Id ? item.Id.toString() : ""}
          onRefresh={() => this.props.getInfoMessages(true).then(() => {
          })}
          refreshing={this.props.infoMessages.refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7}>
              <View>
                <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color:'rgba(255, 165, 97, 1)'}}>{item.Header}</Text>

                <Text selectable={true} style={{marginLeft: 10, fontSize: 16}}>{item.Message}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInfoMessages: () => dispatch(getInfoMessages()),
  }
}

const mapStateToProps = state => {
  return {
    infoMessages: state.infoMessages,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoTab)

