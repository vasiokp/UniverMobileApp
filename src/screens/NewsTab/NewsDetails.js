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

const NewsDetails = (props) => {
  return (
    <PageLayout>
      <CustomBlock>
        <RowView Title="Новина" Value={props.news.Title} />
        <RowView Title="Опис" Value={props.news.Text} />
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
    width: '100%'
  },
  rowView: {
    flexDirection: 'column',
    margin: 5
  }
})

export default NewsDetails;
