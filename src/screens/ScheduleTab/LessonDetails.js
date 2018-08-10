import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import MainText from '../../components/UI/MainText/MainText'
import backgroundImage from '../../assets/backgroundImage.png'

const LessonDetails = (props) => {
    return (
        <ImageBackground source={backgroundImage} resizeMode="stretch" style={{ width: '100%', height: '100%' }}>
            <View>
                <Text>{props.lesson.LessonNumber}</Text>
                <MainText><Text>LessonDetails</Text></MainText>
                <Text>LessonDetails</Text>
            </View>
        </ImageBackground>
    );
}

export default LessonDetails;
