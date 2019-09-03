import React, { Component } from 'react'
import { 
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { capitalize } from '../../../utils'
import { getCredits } from '../../../../src/store/actions'
import PageLayout from '../../../components/UI/PageLayout/PageLayout'


class CreditDetails extends Component {
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "transparent",
        }}
      />
    );
  }
  componentDidMount () {
    this.props.getCredits()
  }

  renderEmptyContainer = () => (
    <View style={{
      alignItems: 'center',
      marginTop: 30,
    }}>
      <Text style={{
        fontWeight: '400',
        fontSize: 17,
      }}>
        Дані про заліки відсутні
      </Text>
    </View>
  )


  render() {
    return (
      <PageLayout>
        <FlatList data={this.props.credits.items}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
          keyExtractor={item => item.Id ? item.Id.toString() : ""}
          onRefresh={() => this.props.getCredits(true).then(() => {
          })}
          refreshing={this.props.credits.refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <Text style={styles.title}>{item.SubjectName}</Text>
                <Text style={styles.text}>Група: {item.GroupName}</Text>

                <Text style={styles.text}>
                Дата проведення: {capitalize(moment(item.PlannedDate, 'MM-DD-YYYY').format('dddd, D MMMM YYYY'))}
                </Text>

                <Text style={styles.text}>Екзаменатор: {item.TeacherName}</Text>
                <Text style={styles.text}>Аудиторія: {item.AuditoryName}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={this.renderEmptyContainer()}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
        />
      </PageLayout>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 165, 97, 1)'
  },
  text: {
    fontSize: 15,
    marginLeft: 10
  },
})

const mapDispatchToProps = dispatch => {
  return {
    getCredits: () => dispatch(getCredits()),
  }
}

const mapStateToProps = state => {
  return {
    credits: state.credits,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditDetails)
