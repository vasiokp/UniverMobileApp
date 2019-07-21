import React, { Component } from 'react'
import { View, Button, StyleSheet, Tab, Tabs, Sonnet, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { PRIMARY_COLOR } from '../../plugins/AppColors'


class SessionTab extends Component {

  ShowCreditDetails() {
    this.props.navigator.push({
      screen: 'CreditDetails',
      title: 'Заліки'
    })
  }

  ShowExamDetails() {
    this.props.navigator.push({
      screen: 'ExamDetails',
      title: 'Іспити'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Заліки"
          onPress={this.ShowCreditDetails.bind(this)}
          color={PRIMARY_COLOR}
          style={styles.creditButton}
        />
        <View
          style={{
            height: 15,
            width: "100%",
            backgroundColor: "transparent",
          }}
        />
        <Button
          title="Іспити"
          onPress={this.ShowExamDetails.bind(this)}
          color={PRIMARY_COLOR}
          style={styles.examButton}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGroups: (refresh = false) => dispatch(fetchGroups(refresh)),
    fetchSpecialties: (refresh = false) => dispatch(fetchSpecialties(refresh)),
    fetchTeachers: (refresh = false) => dispatch(fetchTeachers(refresh)),
    fetchSubjects: (refresh = false) => dispatch(fetchSubjects(refresh)),
    fetchAuditories: (refresh = false) => dispatch(fetchAuditories(refresh))
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    specialties: state.specialties,
    teachers: state.teachers,
    subjects: state.subjects,
    auditories: state.auditories,
    profile: state.profile
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionTab)