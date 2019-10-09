import React, { Component } from 'react'
import { View, Button, StyleSheet, Tab, Tabs, Sonnet, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { PRIMARY_COLOR } from '../../plugins/AppColors'


class SessionTab extends Component {

  disableClick = false

  ShowCreditDetails() {
    if (!this.disableClick) {
      this.disableClick = true
      this.props.navigator.push({
        screen: 'CreditDetails',
        title: 'Заліки'
      })
      setTimeout(() => {
        this.disableClick = false
      }, 2000);
    }
  }

  ShowExamDetails() {
    if (!this.disableClick) {
      this.disableClick = true
      this.props.navigator.push({
        screen: 'ExamDetails',
        title: 'Іспити'
      })
      setTimeout(() => {
        this.disableClick = false
      }, 2000);
    }
  }

  ShowRetakeDetails() {
    if (!this.disableClick) {
      this.disableClick = true
      this.props.navigator.push({
        screen: 'RetakeDetails',
        title: 'Перездачі'
      })
      setTimeout(() => {
        this.disableClick = false
      }, 2000);
    }
  }

  ShowStateExamDetails() {
    if (!this.disableClick) {
      this.disableClick = true
      this.props.navigator.push({
        screen: 'StateExamDetails',
        title: 'Державні іспити'
      })
      setTimeout(() => {
        this.disableClick = false
      }, 2000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            title="Заліки"
            onPress={this.ShowCreditDetails.bind(this)}
            color={PRIMARY_COLOR}
            style={styles.creditButton}
          />
        </View>
        <View
          style={styles.split}
        />
        <View style={styles.button}>
          <Button
            title="Іспити"
            onPress={this.ShowExamDetails.bind(this)}
            color={PRIMARY_COLOR}
            style={styles.examButton}
          />
        </View>
        <View
          style={styles.split}
        />
        <View style={styles.button}>
          <Button
            title="Перездачі"
            onPress={this.ShowRetakeDetails.bind(this)}
            color={PRIMARY_COLOR}
            style={styles.retakeButton}
          />
        </View>
        <View
          style={styles.split}
        />
        <View style={styles.button}>
          <Button
            title="Державні іспити"
            onPress={this.ShowStateExamDetails.bind(this)}
            color={PRIMARY_COLOR}
            style={styles.stateExamButton}
          />
        </View>
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
  },
  split:{
    height: 15,
    width: "100%",
    backgroundColor: "transparent",
  },
  button:{
    marginLeft: 10,
    marginRight: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionTab)