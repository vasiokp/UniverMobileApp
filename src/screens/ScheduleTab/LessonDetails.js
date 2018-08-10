import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText/MainText'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import CustomBlock from '../../components/UI/CustomBlock/CustomBlock';

const LessonDetails = (props) => {
  return (
    <PageLayout>
      <CustomBlock style={styles.block}>
        <Text>{props.lesson.name}</Text>
        <MainText><Text>LessonDetails</Text></MainText>
        <Text>LessonDetails</Text>
      </CustomBlock>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  block: {
    margin: 10
  }
})

export default LessonDetails;
