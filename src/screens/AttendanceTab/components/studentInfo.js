import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md'
const checkedIcon = (<Icon name={iconPrefix + "-checkmark-circle-outline"} size={30} color="#000"/>)
const icon = (<Icon name={iconPrefix + "-radio-button-off"} size={30} color="#000"/>)

class StudentInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  changeStatus() {
    this.setState({checked : !this.state.checked})
  }
  componentDidMount () {
    this.setState({checked: this.props.item.CheckIn})
  }
  render() {
    return (
      <View >
        <TouchableOpacity style={styles.item} onPress={this.changeStatus.bind(this)}>
          <View style={styles.title}>
            <Text>{this.props.index + 1 + '. '}</Text>
            <Text>{this.props.item.StudentName}</Text>
          </View>
          <View style={styles.check}>
            { this.state.checked ? checkedIcon : icon}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'white'
  },
  check: {
    marginRight: 10
  },
  title: {
    flexDirection: 'row',
    padding: 5
  }
})

const mapDispatchToProps = dispatch => {
  return {
    // logout: () => dispatch(logout())
  }
}

const mapStateToProps = state => {
  return {
   // profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfo)
