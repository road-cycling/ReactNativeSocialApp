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

    constructor(props) {
      super(props);
      this.state = {
        users: []
      }
    }

   componentWillMount() {
     /*
    firebase.database().ref(`/groups`)
    .on('value', snapshot => {
      snapshot.forEach(item => console.log(item.val()))
    })*/
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(users => {
      this.setState({ users })
    })

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#0097A7' }}>
        <View style={styles.header}>
          <Link
            style={{ padding: 6, backgroundColor: '#80DEEA', marginLeft: 20, borderWidth: 0.5, borderColor: 'white', marginBottom: 2}}
            to='/welcome'>
            <Text> Back </Text>
          </Link>
        </View>
        <View style={styles.bHead}>
          <Text style={styles.headText}>My Groups</Text>
        </View>
        <View style={styles.mid}>
          <ScrollView style={styles.scroll}>
            <Card containerStyle={{padding: 0}} >
              {
               this.state.users.map((u, i) => {
                 return (
                   <ListItem
                     key={i}
                     roundAvatar
                     title={u.name}
                     avatar={{uri: `https://randomuser.me/api/portraits/men/${i}.jpg`}}
                   />
                 );
               })
              }
            </Card>
          </ScrollView>
        </View>
        <View style={styles.bottom}></View>

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
    backgroundColor: '#80DEEA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mid: {
    flex: 4,
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
