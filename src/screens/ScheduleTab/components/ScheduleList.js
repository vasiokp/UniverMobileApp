import React from 'react'
import { View, FlatList, SectionList, TouchableOpacity, Text } from 'react-native'
import ScheduleListItem from './ScheduleListItem'

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 10,
        width: "100%",
        backgroundColor: "transparent",
      }}
    />
  )
}

export default props => {
  const data = props.data.map((item, index) => {
    return {
      ...item,
      key: index.toString()
    }
  })
  console.log(data)
  return (
    // <FlatList data={data}
    //   renderItem={({ item }) => (
    //     <TouchableOpacity>
    //       <ScheduleListItem {...item}></ScheduleListItem>
    //     </TouchableOpacity>
    //   )}
    //   ItemSeparatorComponent = {FlatListItemSeparator}>
    // </FlatList>
      <SectionList style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}} stickySectionHeadersEnabled={false} sections={[
        {title: 'SECTION 1', data: data},
        {title: 'SECTION 2', data: data},
        {title: 'SECTION 3', data: data},
      ]}
        renderItem={({item, index, section}) => (
          <TouchableOpacity>
            <ScheduleListItem {...item}></ScheduleListItem>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => (
          <View style={{
            paddingTop: 40,
            paddingHorizontal: 20,
            paddingBottom: 5
          }}>
            <Text>{section.title}</Text>
          </View>
        )}>
      </SectionList>
  )
}
