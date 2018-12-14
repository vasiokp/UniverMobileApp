import React, {Component} from 'react';
import { View, Text, Platform } from 'react-native';
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
  render() {
    return (
      <View style={this.props.style}>
          <Text>{this.props.item.StudentName}</Text>
          <Text>{this.props.item.CheckIn ? 'tut': 'ne tut'}</Text>
          { this.props.item.CheckIn ? checkedIcon : icon}
      </View>
    );
  }
}

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
