import { View, ScrollView } from 'react-native'
import React from 'react'
import LessonItem from './Lesson'
const scheduleItem = (props) => (
    <View style={{
        backgroundColor: props.BackgroundColor,
        padding: 10,
        marginTop: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ffffff'
    }}>
        <LessonItem LessonNumber="№" TextColor={props.TextColor} Teacher="Викладач" Auditory="Аудиторія" />
        <ScrollView>
            {props.Items ? props.Items.map(function (item, i) {
                return (
                    <LessonItem
                        key={i}
                        LessonNumber={item.LessonNumber}
                        Teacher={item.Teacher.Name + ' ' + item.Teacher.LastName}
                        Auditory={item.Auditory.Number + ', ' + item.Auditory.Description}
                        TextColor={props.TextColor} />
                )
            }) : ''}
        </ScrollView>
    </View >
);

export default scheduleItem;