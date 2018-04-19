import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { AdminButton } from './button'
import '@firebase/firestore'
import { Card, ListItem, Button, SearchBar } from 'react-native-elements'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  FlatList
} from 'react-native'


class viewGroup extends Component {

  state = {
    groupID: '',
    currentUser: '',
    inGroup: 0,
    data: '',
    firestore: '',
    name: '',
    uid: '',
    organizer: '',
    owner: '',
    displayName: '',
    loading: true,
    changedStatus: false,
    summary: '',
    upcomingEvents: [
      {
        summary: 'testt',
        location: 'San Jose',
        chosenDate: '08/23/24'
      },
    ],
    pastEvents: []
  }


  async componentWillMount() {
    //hotfix
    let { match: { params: { group } } } = this.props
    //coo

    this.setState({
      groupID: group
    })

    try {
      //hotfix
      const { currentUser: { uid } } = firebase.auth();

      this.setState({
        currentUser: uid
      })
      //let group = '3pDZXnFQ6T2hcKBJvgkq'
      //let uid = 'XdLTQIYrVTU4Y9JThlfOoZHGp6R2'

    //  console.log(`group is and uid is ${group} :: uid ${uid}`)

      let data = await firebase.firestore()
            .collection('groups')
            .doc(group)


      let events = this.getGroupEvents(data)
      data = await data.get()
      let { name, organizer, owner, summary, displayName } = data.data();
      this.setState({
        name,
        organizer,
        owner,
        summary,
        uid,
        displayName,
        data: data.id,
        loading: false
      });

      await events
      this.isMember()
    } catch (e) {
      console.log(e)
    }
  }

  leaveGroup = async () => {
    if (!this.state.changedStatus) {
      //mutex ?
      this.setState({ changedStatus: true })

      let { groupID, currentUser } = this.state

      //delete user from group reference
      let newData = await firebase.firestore()
                        .collection('groups')
                        .doc(groupID)
                        .collection('users')
                        .where("userID", "==", currentUser)
                        .get()

      newData.forEach(item => item.ref.delete())

      //now we need to delete group reference from user
      let userRef = await firebase.firestore()
                      .collection('users')
                      .doc(currentUser)
                      .collection('groupsApartOf')
                      .where("groupID", "==", groupID)
                      .get()

      userRef.forEach(item => item.ref.delete())

      this.setState({ inGroup: 0 })
    }
  }

  joinGroup = async () => {
    if (!this.state.changedStatus) {
      this.setState({ changedStatus: true })

      let { groupID, currentUser } = this.state

      const add = await firebase.firestore()
          .collection('users')
          .doc(currentUser)
          .collection('groupsApartOf')
          .add({
            groupID,
            name: this.state.name,
            organizer: "fooBaz"
           });

      await firebase.firestore()
          .collection('groups')
          .doc(groupID)
          .collection('users')
          .add({
            displayName: "ADD",
            userID: currentUser,
            owner: false,
            admin: false,
            deleteID: 'Dont need this no more'
          })

      this.setState({ inGroup: 1 })
    }
  }

  async getGroupEvents(data) {
    let groupData = [], upcomingEvents = [], pastEvents = []

    data = await data.collection('events').get()
    data.forEach(item => groupData.push(item.data()))

    let l = new Date()
    for (let i = 0; i < groupData.length; i++) {
      let otherDate = new Date(groupData[i].chosenDate)
      if (l > otherDate) {
        pastEvents.push(groupData[i])
      } else {
        upcomingEvents.push(groupData[i])
      }
    }

    //async set state?!?!
    this.setState({
      upcomingEvents,
      pastEvents
    })
  }

  async isMember() {

    let { groupID, currentUser } = this.state

    let newData = await firebase.firestore()
                      .collection('groups')
                      .doc(groupID)
                      .collection('users')
                      .where("userID", "==", currentUser)

    let inGroup = await newData.get()

    this.setState({ inGroup: inGroup.size })
  }

  render() {

    let { uid, owner, inGroup } = this.state;
    //typescript looks really attractive rn

    return (
      <View style={{ flex: 1, backgroundColor: '#26C6DA' }}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28}}
          >
            <Link
              style={{ padding: 5, backgroundColor: '#0097A7', borderRadius: 40, marginLeft: 20}}
              to='/welcome'>
              <Text> Back </Text>
            </Link>
            <AdminButton
                ownerUID={owner}
                userUID={uid}
                inGroup={inGroup}
                joinGroup={this.joinGroup}
                leaveGroup={this.leaveGroup}
                linkData={this.state.groupID}
            />
          </TouchableOpacity>
        </View>
      {
        this.state.loading === true
        ? ( <ActivityIndicator
            style={{flex: 1}}
          /> )
        : (
          <View>
           <View style={styles.header}>
            <Text style={{ fontSize: 25, paddingTop: 10 }}>{this.state.name.substring(0, 25)}</Text>
          </View>
          <View style={styles.firstBox}>
            <Text style={{maxWidth:'50%'}}> Organizer: {this.state.organizer.substring(0, 18)} </Text>
            <Text style={{maxWidth: '50%'}}> Owner: {this.state.displayName.substring(0, 18)} </Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={{alignSelf: 'center', paddingBottom: 10}}> Summary </Text>
            <Text> {this.state.summary.substring(0, 300)}</Text>
          </View>
          <View style={styles.tBox}>
            <Text style={{alignSelf: 'center'}}> { this.state.upcomingEvents.length == 0 ? "" : "Upcoming Events" } </Text>
              <FlatList
                data={this.state.upcomingEvents}
                renderItem={u =>
                  <Card containerStyle={{flex: 1, padding: 0}} >
                      <ListItem
                        key={ u.index }
                        title={ u.item.summary }
                        subtitle={ u.item.location + " " + u.item.chosenDate }
                        containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
                        titleStyle={{ color: 'black' }}
                        subtitleStyle={{ color: '#0097A7' }}
                        onPressRightIcon={() => {}}
                      />
                  </Card>
                }
              />
            <Text style={{alignSelf: 'center'}}> { this.state.pastEvents.length == 0 ? "" : "Past Events" } </Text>
            <FlatList
              data={ this.state.pastEvents}
              renderItem={u =>
                <Card containerStyle={{flex: 1, padding: 0}} >
                    <ListItem
                      key={ u.index }
                      title={ u.item.summary }
                      subtitle={ u.item.location + " " + u.item.chosenDate }
                      containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
                      titleStyle={{ color: 'black' }}
                      subtitleStyle={{ color: '#0097A7' }}
                      onPressRightIcon={() => {}}
                    />
                </Card>
              }
            />
          </View>
          </View>
        )
      }
      </View>
    )
  }

}

function mapStateToProps(state) {
  let {
    name,
    organizer,
    summary,
    isPublic,
    loading
  } = state.createGroupReducer
  return {
    name,
    organizer,
    summary,
    isPublic,
    loading
  }
}

const styles = StyleSheet.create({
  headerTop: {
    backgroundColor: '#00838F',
    height: '10%',
  },
  header: {
    backgroundColor: '#26C6DA',
    height: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bubble: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 50
  },
  firstBox: {
    backgroundColor: '#26C6DA',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textInputOne: {
    width: '40%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 19,
    padding: 5
  },
  summaryBox: {
    height: '20%',
    backgroundColor: '#26C6DA',
    width: '80%',
    alignSelf: 'center'
  },
  sum: {
    flex: 1,
    margin: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 19,
    padding: 5
  },
  tBox: {
    height: '50%',
    backgroundColor: '#26C6DA',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  button: {
    marginTop: 20,
    height: '15%',
    backgroundColor: '#00838F',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})



export default connect(mapStateToProps)(viewGroup);
