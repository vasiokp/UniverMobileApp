import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/index'
import StudentInfo from './components/studentInfo'

class AttendanceTab extends Component {
  constructor(props) {
    super(props)
  }

  keyExtractor = (item, index) => item.id ? item.id.ToString() : ''

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: '300' }}>Група</Text>
        <FlatList
          data = {items}
          keyExtractor ={this.keyExtractor}
          renderItem={({item}) =><StudentInfo style={styles.item} item={item}/>}
          >
        </FlatList>
      </View>
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
    height: 50,
    flex: 1,
    flexDirection: 'row'
  },
})

const items = [
  {
    "Id": 95,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 36,
    "StudentName": "Бежнар Катерина Миколаївна "
  },
  {
    "Id": 96,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 56,
    "StudentName": "Чебан Владислав Валентинович"
  },
  {
    "Id": 97,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 55,
    "StudentName": "Фрицький Ерік Артурович"
  },
  {
    "Id": 98,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 54,
    "StudentName": "Фенчук Валентин Сергійович"
  },
  {
    "Id": 99,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 53,
    "StudentName": "Токар Ілля Володимирович"
  },
  {
    "Id": 100,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 52,
    "StudentName": "Спіжавка Станіслав Іванович"
  },
  {
    "Id": 101,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 51,
    "StudentName": "Серединський Максим Іванович"
  },
  {
    "Id": 102,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 50,
    "StudentName": "Пискор Олексій Орестович"
  },
  {
    "Id": 103,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 49,
    "StudentName": "Паламарюк Іванна Василівна"
  },
  {
    "Id": 104,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 48,
    "StudentName": "Олієвський Владислав Іванович"
  },
  {
    "Id": 105,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 57,
    "StudentName": "Шинкар Владислав Андрійович"
  },
  {
    "Id": 106,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 47,
    "StudentName": "Мельник Віталій Олександрович"
  },
  {
    "Id": 107,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 45,
    "StudentName": "Керунець Тетяна Андріївна"
  },
  {
    "Id": 108,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 44,
    "StudentName": "Ілащук Анна-Марія Вікторівна"
  },
  {
    "Id": 109,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 43,
    "StudentName": "Дробко Вадим Віталійович"
  },
  {
    "Id": 110,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 42,
    "StudentName": "Длубік Владислав Володимирович"
  },
  {
    "Id": 111,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 41,
    "StudentName": "Дибкалюк Юлія Володимирівна"
  },
  {
    "Id": 112,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 40,
    "StudentName": "Гуцуляк Іван Васильович"
  },
  {
    "Id": 113,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 39,
    "StudentName": "Галкевич Анатолій Вікторович"
  },
  {
    "Id": 114,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 38,
    "StudentName": "Галичанська Анна Дмитрівна"
  },
  {
    "Id": 115,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 37,
    "StudentName": "Бойчук Анастасія Володимирівна"
  },
  {
    "Id": 116,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 46,
    "StudentName": "Клапащук Анастасія Василівна"
  },
  {
 
 "Id": 117,
    "CheckIn": false,
    "Date": "2018-12-12T00:00:00",
    "ScheduleId": 370,
    "StudentId": 58,
    "StudentName": "Шморгун Анастасія Анатоліївна"
  }
 ]
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTab)
