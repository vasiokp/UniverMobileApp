import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import image from '../../assets/t1.png'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import moment from 'moment'

const NewsDetails = (props) => {
  return (
    <PageLayout style={{ backgroundColor: '#f4f4f4', flex: 1 }}>
      <ScrollView>
        <Image resizeMode="contain" style={{ height: 250, width: '100%' }} source={props.imageLoading ? null : (props.image && props.imageError === false) ? { uri: 'data:image/jpeg;base64, ' + props.image } : image}></Image>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', minHeight: 300, padding: 10 }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{
              fontSize: 26,
              fontWeight: '500',
              textAlign: 'center'
            }}>
              {props.Title || 'без назви'}
            </Text>
          </View>
          <View>
            <Text style={{
              fontSize: 16
            }}>
              {props.Text}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <Text style={{
              color: '#444'
            }}>
              {props.Author || 'Невідомий автор'}
            </Text>
            <Text style={{
              color: '#444'
            }}>
              {moment(props.Date).format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  )
}

export default NewsDetails
