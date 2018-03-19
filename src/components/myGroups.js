import React, { Component } from 'react'
import { Card, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import firebase from 'firebase';
//import { graphql, buildSchema } from 'graphql'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native'


class myGroups extends Component {

  /*
    Dummy state not connected to redux
    ok this renders ok,
    next part is caching image, and other stuff
  */
    constructor(props) {
      super(props);
      this.state = {
        users: []
      }
    }

   async componentWillMount() {
     const rootRef = firebase.database().ref()
     const { currentUser } = firebase.auth();
     //const { uid } = currentUser;
     let uid = 'XdLTQIYrVTU4Y9JThlfOoZHGp6R2'
     const userGroups = rootRef.child(`users`)
     const group = rootRef.child('groups')
     const users = [];

      try {
        const groupsForUser = await userGroups.child(uid).once('value')
        const keys = Object.values(groupsForUser.val())
        for (let i = 0; i < keys.length; i++) {
          let groupsRef = rootRef.child(`/groups/${keys[i].key}`)
          let groupData = await groupsRef.once('value');
          let data = groupData.val();
          data.id = keys[i].key
          users.push(data);
        }
        this.setState({ users });
      } catch (e) {
        console.log(e)
      }

    console.log(this.state);

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#0097A7' }}>
        <View style={styles.header}>
          <Link
            style={{ padding: 5, backgroundColor: '#0097A7', marginLeft: 20, borderWidth: 0.5, borderColor: 'white', marginBottom: 5}}
            to='/welcome'>
            <Text style={{color: 'white'}}> Back </Text>
          </Link>
        </View>
        <View style={styles.bHead}>
          <Text style={styles.headText}>My Groups</Text>
        </View>
        <View style={styles.mid}>
          <ScrollView style={styles.scroll}>
            <Card containerStyle={{padding: 0}} >
              {
                this.state.users.map((u, i) => (
                  <ListItem
                    key={ i }
                    title={ u.name }
                    subtitle={ u.summary.substring(0, 50) }
                    containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
                    titleStyle={{ color: 'black' }}
                    subtitleStyle={{ color: '#0097A7' }}
                    onPressRightIcon={data => console.log(u)}
                  />
                ))
              }
            </Card>
          </ScrollView>
        </View>


      </View>
    );
  }
}



/*trying FLEX now */
const styles = StyleSheet.create({
  header: {
    flex: .5,
    backgroundColor: '#0097A7',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  bHead: {
    flex: .5,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mid: {
    flex: 4.5,
    backgroundColor: '#00BCD4',
    alignItems: 'center'
  },
  bottom: {
    flex: .5,
    backgroundColor: '#0097A7'
  },
  headText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  scroll: {
    width: '90%',
    flex: 1,
  }
})

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, null)(myGroups);
