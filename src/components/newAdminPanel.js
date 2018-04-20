import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'

import firebase from 'firebase';


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

import { List, ListItem } from 'react-native-elements'



class newAdminPanel extends Component {

  state = {
    chosenDate: new Date(),
    location: "",
    summary: "",
    data: ""
  }

  componentWillMount() {
    let data = this.props.match.params.group
    //let data = '3pDZXnFQ6T2hcKBJvgkq'
    this.setState({ data })
  }

  onClick = data => {
    if (data === 'event') {
      this.props.history.push(`/createEvent/${this.state.data}`)
    }

    if (data === 'members') {
      this.props.history.push(`/members/${this.state.data}`)
    }
  }

  render() {

  const dta = [
    {
      title: 'Users',
      move: 'members'
    },
    {
      title: 'Create Event',
      move: 'event'
    }
  ]

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
            dta.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
                onPress={() => this.onClick(item.move)}
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


export default connect(mapStateToProps)(newAdminPanel);
