import React, { Component } from 'react'
import { Card, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import firebase from 'firebase';
import '@firebase/firestore'
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

    pushNewGroup = id => {
      this.props.history.push(`/getGroup/${id}`)
    }

   async componentWillMount() {
     let firestore = firebase.firestore()
     let items = [];
     let { currentUser: { uid } } = firebase.auth();

     let data = await firestore
       .collection('users')
       .doc(uid)
       .collection('groupsApartOf')
      data = await data.get()

       data.forEach(async item => {
         items.push(item.data());
       })

       this.setState({ users: items });
       console.log(this.state.users.data)
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
          { this.state.users.length !== 0 ? (
            <ScrollView style={styles.scroll}>
              <Card containerStyle={{padding: 0}} >
                {
                  this.state.users.map((u, i) => (
                    <ListItem
                      key={ i }
                      title={ u.name }
                      subtitle={ u.organizer.substring(0, 50) }
                      containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
                      titleStyle={{ color: 'black' }}
                      subtitleStyle={{ color: '#0097A7' }}
                      onPressRightIcon={() => this.pushNewGroup(u.groupID)}
                    />
                  ))
                }
              </Card>
            </ScrollView>
          ) : (<View />)
         }
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
