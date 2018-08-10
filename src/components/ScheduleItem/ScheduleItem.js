import { View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import LessonItem from './Lesson'
import {BLOCK_BORDER_COLOR} from '../../plugins/AppColors'
const scheduleItem = (props) => (
    <View style={{
        backgroundColor: props.BackgroundColor,
        padding: 10,
        marginTop: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: BLOCK_BORDER_COLOR
    }}>
        <LessonItem FirstColumn="№" SecondColumn="Предмет" ThirdColumn="Аудиторія" />
        <ScrollView>
            {props.Items ? props.Items.map((item) => {
                return (
                    <TouchableOpacity key={item.id} onPress={props.onItemPressed.bind(this, item.Id)} activeOpacity={0.7}>
                        <LessonItem
                            FirstColumn={item.lessonNumber}
                            SecondColumn={item.name}
                            ThirdColumn={item.auditory.name} />
                    </TouchableOpacity>
                )
            }) : ''}
        </ScrollView>
    </View >
);

export default scheduleItem;