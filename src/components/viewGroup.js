import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'



class viewGroup extends Component {

  state = {
    rootRef: /*firebase.database().ref()*/ null,
    name: 'PI KAPPA BETA ALPHA NETA',
    organizer: 'test value',
    owner: 'Nathan Kamm',
    summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

  }
/*
  async componentWillMount() {
    let data = this.props.match.params.group
    console.log(data)
    data = await this.state.rootRef.child(`groups/${data}`).once('value');
    let { name, organizer, owner, summary } = data.val();
    this.setState({ name, organizer, owner, summary });
  }
*/
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
        <View style={styles.header}>
          <View style={styles.bubble}></View>
        </View>
        <View style={styles.firstBox}>
          <TextInput
            style={styles.textInputOne}
            placeholder={"Name"}
            value={this.props.name}
            onChangeText={() => {}}
          />
          <TextInput
            style={styles.textInputOne}
            placeholder={"Organizer"}
            value={this.props.organizer}
            onChangeText={() => {}}
            />
        </View>
        <View style={styles.summaryBox}>
          <TextInput
            style={styles.sum}
            placeholder={"Summary"}
            multiline = {true}
            value={this.props.summary}
            onChangeText={() => {}}
           />
        </View>
        <View style={styles.tBox}>
          <ToggleSwitch
            isOn={false}
            onColor='#0097A7'
            offColor='#26C6DA'
            label='Public / Private'
            labelStyle={{color: 'black', fontWeight: '700'}}
            size='medium'
            onToggle={() => {}}
            />

            <TouchableOpacity
              onPress={() => {}}
              style={styles.button}>
              <Text style={{fontWeight: 'bold'}}> Create </Text>
            </TouchableOpacity>
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
    height: '20%',
    justifyContent: 'center',
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
    height: '10%',
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
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  sum: {
    flex: 1,
    margin: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 19,
    padding: 5
  },
  tBox: {
    height: '40%',
    backgroundColor: '#26C6DA',
    flexDirection: 'column',
    alignItems: 'center'
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
