import React from 'react';
import { View, Text } from 'react-native';
import MainText from '../../components/UI/MainText/MainText'
import PageLayout from '../../components/UI/PageLayout/PageLayout'

const NewsDetails = (props) => {
    return (
        <PageLayout>
            <View>
                <MainText><Text>LessonDetails</Text></MainText>
                <Text>News details</Text>
            </View>
        </PageLayout>
    );
}

export default NewsDetails;
