import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import MainText from '../../components/UI/MainText/MainText'
import backgroundImage from '../../assets/backgroundImage.png'

const NewsDetails = (props) => {
    return (
      <ImageBackground source={backgroundImage} resizeMode="stretch" style={{ width: '100%', height: '100%' }}>
        <View>
            <MainText><Text>LessonDetails</Text></MainText>
            <Text>News details</Text>
        </View>
        </ImageBackground>
    );
}

export default NewsDetails;
