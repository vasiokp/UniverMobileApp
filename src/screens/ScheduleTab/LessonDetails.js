import React from 'react';
import { View, Text } from 'react-native';

const LessonDetails = (props) => {
    return (
        <View>
            <Text>{props.lesson.LessonNumber}</Text>
            <Text>LessonDetails</Text>
            <Text>LessonDetails</Text>
        </View>
    );
}

export default LessonDetails;
