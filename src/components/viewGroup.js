import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
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
    data: '',
    firestore: '',
    name: 'PI KAPPA BETA ALPHA NETA',
    uid: '',
    organizer: 'test value',
    owner: 'Nathan Kamm',
    displayName: 'Baz Foo',
    summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    events: [
      {
        name: 'testt',
        place: 'San Jose',
        time: 'Noon',
        date: '08/23/24'
      },
      {
        name: 'testt',
        place: 'San Jose',
        time: 'Noon',
        date: '08/23/24'
      },
      {
        name: 'testt',
        place: 'San Jose',
        time: 'Noon',
        date: '08/23/24'
      },
    ]

  }


  async componentWillMount() {
    let { match: { params: { group } } } = this.props

    try {
      const { currentUser: { uid } } = firebase.auth();

      //this is terrible
      let data = await firebase.firestore()
            .collection('groups')
            .doc(group)

      data = await data.get()
      let { name, organizer, owner, summary, displayName } = data.data();
      this.setState({ name, organizer, owner, summary, uid, displayName, data: data.id });
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    let { uid, owner } = this.state;


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

            {
              uid === owner ? (
                <Link
                  style={{ padding: 5, backgroundColor: '#0097A7', borderRadius: 40, marginRight: 20}}
                  to={`/adminPanel/${this.state.data}`}>
                  <Text> Admin Tools </Text>
                </Link>
              ) : (
                <View />
              )
            }
          </TouchableOpacity>
        </View>
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
          <Text style={{alignSelf: 'center'}}> Upcoming Events </Text>
            <FlatList
              data={this.state.events}
              renderItem={u =>
                <Card containerStyle={{flex: 1, padding: 0}} >
                    <ListItem
                      key={ u.index }
                      title={ u.item.name }
                      subtitle={ u.item.place + " " + u.item.time + " " + u.item.date }
                      containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
                      titleStyle={{ color: 'black' }}
                      subtitleStyle={{ color: '#0097A7' }}
                      onPressRightIcon={() => {}}
                    />
                </Card>
              }
            />
          <Text style={{alignSelf: 'center'}}> Past Events </Text>
          <FlatList
            data={this.state.events}
            renderItem={u =>
              <Card containerStyle={{flex: 1, padding: 0}} >
                  <ListItem
                    key={ u.index }
                    title={ u.item.name }
                    subtitle={ u.item.place + " " + u.item.time + " " + u.item.date }
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

}

function mapStateToProps(state) {
  console.log(state.createGroupReducer)
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

/*
<Card containerStyle={{padding: 0}} >
{
  this.state.data.map((u, i) => (
    <ListItem
      key={ i }
      title={ u[0].name }
      subtitle={ u[0].summary.substring(0, 50) }
      containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
      titleStyle={{ color: 'black' }}
      subtitleStyle={{ color: '#0097A7' }}
      onPressRightIcon={() => this.pushNewGroup(u)}
    />
  ))
}
</Card>
*/

export default connect(mapStateToProps)(viewGroup);
