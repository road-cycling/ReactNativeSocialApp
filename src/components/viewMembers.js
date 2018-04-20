import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'

import firebase from 'firebase';
import '@firebase/firestore'

import { kickUser } from '../actions'



import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  DatePickerIOS
} from 'react-native'

import { List, ListItem, Icon } from 'react-native-elements'



/* <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate} /> */
class viewMembers extends Component {

  //todo context api <3
  state = {
    members: [],
    groupID: ''
  }

  async componentWillMount() {
    console.log(`before kickuser`)

    let firestore = firebase.firestore()
    let data = this.props.match.params.group

    this.setState({ groupID: data })

    let items = []
    let res =  firestore
          .collection('groups')
          .doc(data)
          .collection('users')

    res = await res.get()
    res.forEach(async item => {
      items.push(item.data())
    })
    this.setState({ members: items })
  }


  render() {


    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 28}}
          >
            <Link
              style={{ padding: 5, backgroundColor: '#0097A7', borderRadius: 40, marginLeft: 20}}
              to='/welcome'>
              <Text> Back </Text>
            </Link>
          </TouchableOpacity>
        </View>
        <View style={styles.middle}>
        <List
          containerStyle={{backgroundColor: '#27C6DA'}}
        >
          {
            this.state.members.map((item, i) => (
              <ListItem
                key={i}
                title={item.displayName || "test"}
                leftIcon={{name: item.owner ? 'star': 'av-timer'}}
                rightIcon={{name: 'clear'}}
                onPressRightIcon={() => kickUser(item.userID, this.state.groupID)}
                onPress={() => {}}
              />
            ))
          }
        </List>
        </View>


      </View>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

const styles = StyleSheet.create({
  headerTop: {
    backgroundColor: '#00838F',
    height: '10%',
  },
  middle: {
    flex: 1,
    backgroundColor: '#26C6DA',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

})


export default connect(mapStateToProps)(viewMembers);
