import React, { Component } from 'react'
import { Card, ListItem, Button, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import debounce from 'debounce'
import { Link } from 'react-router-native'
import firebase from 'firebase';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native'

/* https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js */
class joinGroup extends Component {
  state = {
    data: [],
    rootRef : firebase.database().ref()
  }
  /*
  updateText = innerText => {
    this.setState({ innerText })
  }*/

  pushNewGroup = array => {
    let id = array[1]
    //console.log(id)
    this.props.history.push(`/getGroup/${id}`)
  }

  placeholdTextChange = debounce(async text => {
    let data = await this.state.rootRef.child('groups').once('value');
    data = data.val();
    let keys = Object.keys(data);
    let test = Object.values(data).map((item, index) => [item, keys[index]])
    data = test.filter(item => item[0].name.includes(text) && item[0].isPublic === 1);
    this.setState({ data })
  }, 1000);



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
        <SearchBar
          style={{flex: 1, alignSelf: 'stretch'}}
          lightTheme
          containerStyle={{ backgroundColor: '#00BCD4'}}
          inputStyle={{ backgroundColor: '#0097A7', color: 'white' }}
          placeholderTextColor={'white'}
          onChangeText={(text) => this.placeholdTextChange(text)}
          onClearText={() => {}}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...'
          />
        </View>
        <View style={styles.mid}>
          <ScrollView style={styles.scroll}>
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
          </ScrollView>
        </View>


      </View>
    )
  }
}

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


function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps
)(joinGroup);
