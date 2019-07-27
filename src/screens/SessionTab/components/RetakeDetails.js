import React, { Component } from 'react'
import { 
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { capitalize } from '../../../utils'
import { getRetakes } from '../../../../src/store/actions'
import PageLayout from '../../../components/UI/PageLayout/PageLayout'


class RetakeDetails extends Component {
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
    this.props.getRetakes()
  }


  render() {
    return (
      <PageLayout>
        <FlatList data={this.props.retakes.items}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
          keyExtractor={item => item.Id ? item.Id.toString() : ""}
          onRefresh={() => this.props.getRetakes(true).then(() => {
          })}
          refreshing={this.props.retakes.refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold', color:'rgba(255, 255, 255, 0.9)', backgroundColor: 'rgba(255, 165, 97, 1)'}}>{item.SubjectName}</Text>
                <Text style={{marginLeft: 10}}>Група: {item.GroupName}</Text>

                <Text style={{marginLeft: 10}}>
                Дата проведення: {capitalize(moment(item.PlannedDate, 'MM-DD-YYYY').format('dddd, D MMMM YYYY'))}
                </Text>

                <Text style={{marginLeft: 10}}>Екзаменатор: {item.TeacherName}</Text>
                <Text style={{marginLeft: 10}}>Аудиторія: {item.AuditoryName}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
        />
      </PageLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const mapDispatchToProps = dispatch => {
  return {
    getRetakes: () => dispatch(getRetakes()),
  }
}

const mapStateToProps = state => {
  return {
    retakes: state.retakes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RetakeDetails)
