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
import { getExams } from '../../../../src/store/actions'
import PageLayout from '../../../components/UI/PageLayout/PageLayout'


class ExamDetails extends Component {
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
    this.props.getExams()
  }


  render() {
    return (
      <PageLayout>
        <FlatList data={this.props.exams.items}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
          keyExtractor={item => item.Id ? item.Id.toString() : ""}
          onRefresh={() => this.props.getExams(true).then(() => {
          })}
          refreshing={this.props.exams.refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <Text style={styles.title}>{item.SubjectName}</Text>
                <Text style={styles.text}>Група: {item.GroupName}</Text>

                <Text style={styles.text}>
                Дата проведення: {capitalize(moment(item.PlannedDate, 'MM-DD-YYYY').format('dddd, D MMMM YYYY'))}
                </Text>

                <Text style={styles.text}>Екзаменатор: {item.TeacherName}</Text>
                <Text style={styles.text}>Аудиторія: {item.AuditoryName}</Text>
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
  title: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 165, 97, 1)'
  },
  text: {
    fontSize: 15,
    marginLeft: 10
  },
})

const mapDispatchToProps = dispatch => {
  return {
    getExams: () => dispatch(getExams()),
  }
}

const mapStateToProps = state => {
  return {
    exams: state.exams,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetails)
