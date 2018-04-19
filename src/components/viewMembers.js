import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'

import firebase from 'firebase';
import '@firebase/firestore'



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

  state = {
    members: []
  }

  async componentWillMount() {
    let firestore = firebase.firestore()
    let data = this.props.match.params.group

    //let data = 'chXdAIA6gJiH6spIOmxV'
    ///this.setState({ data })
    let items = []
    let res =  firestore
          .collection('groups')
          .doc(data)
          .collection('users')

    res = await res.get()
    res.forEach(async item => {
      //why is this async???....
      items.push(item.data())
    //  console.log(item.data())
    })
    this.setState({ members: items })
    console.log(this.state.members)
  }


  kickFromGroup = (uid) => {
    try {
      console.log(uid)

    } catch (e) {

    }
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
        <List>
          {
            this.state.members.map((item, i) => (
              <ListItem
                key={i}
                title={item.displayName}
                leftIcon={{name: item.owner ? 'star': 'av-timer'}}
                rightIcon={{name: 'clear'}}
                onPressRightIcon={() => this.kickFromGroup(item.userID)}
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
