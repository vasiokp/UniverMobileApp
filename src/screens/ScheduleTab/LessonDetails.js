import React from 'react';
import { View, Text } from 'react-native';
import MainText from '../../components/UI/MainText/MainText'
const LessonDetails = (props) => {
    return (
        <View>
            <Text>{props.lesson.LessonNumber}</Text>
            <MainText><Text>LessonDetails</Text></MainText>
            <Text>LessonDetails</Text>
        </View>
    );
}

export default LessonDetails;
