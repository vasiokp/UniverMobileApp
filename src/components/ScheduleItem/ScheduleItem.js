import { View, ScrollView, TouchableOpacity } from 'react-native'
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
        <LessonItem LessonNumber="№" Teacher="Викладач" Auditory="Аудиторія" />
        <ScrollView>
            {props.Items ? props.Items.map(function (item, i) {
                return (
                    <TouchableOpacity key={item.Id} onPress={props.onItemPressed.bind(this,item.Id)}>
                        <LessonItem
                            LessonNumber={item.LessonNumber}
                            Teacher={item.Teacher.Name + ' ' + item.Teacher.LastName}
                            Auditory={item.Auditory.Number + ', ' + item.Auditory.Description} />
                    </TouchableOpacity>
                )
            }) : ''}
        </ScrollView>
    </View >
);

export default scheduleItem;