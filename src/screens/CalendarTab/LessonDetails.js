import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import CustomBlock from '../../components/UI/CustomBlock/CustomBlock';
import { TEXT_COLOR } from '../../plugins/AppColors';

const RowView = props => (
  <View style={styles.rowView}>
    <View style={styles.titleBlock}><Text style={styles.title}>{props.Title}</Text></View>
    <View style={styles.valueBlock}><Text style={styles.value}>{props.Value}</Text></View>
  </View>
)

const LessonDetails = (props) => {
  return (
    <PageLayout>
      <CustomBlock>
        <RowView Title="Предмет" Value={props.item.name} />
        <RowView Title="Опис" Value={props.item.description} />
        <RowView Title="Тип" Value={props.item.scheduleType.name} />
        <RowView Title="Лектор" Value={props.item.teacher.name} />
        <RowView Title="Аудиторія" Value={props.item.auditory.name} />
        <RowView Title="Тип аудиторії" Value={props.item.auditory.type.name} />
        <RowView Title="Корпус" Value={props.item.auditory.building.name} />
      </CustomBlock>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    // fontFamily: 'Roboto'
  },
  titleBlock: {
    width: '35%'
  },
  value: {
    fontSize: 14,
    // fontFamily: 'Roboto',
    color: TEXT_COLOR
  },
  valueBlock: {
    width: '65%'
  },
  rowView: {
    flexDirection: 'row',
    margin: 5
  }
})

export default LessonDetails;
