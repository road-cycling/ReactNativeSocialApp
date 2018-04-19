import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'

import {
  gNameChanged,
  gOrganizerChanged,
  gSummaryChanged,
  gPublicChanged,
  gLoadingChanged,
  gCreate
} from '../actions'

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



class createGroup extends Component {

  onChange(input, type) {
    switch(type) {

      case 'name':
        return this.props.gNameChanged(input)

      case 'organizer':
        return this.props.gOrganizerChanged(input)

      case 'summary':
        return this.props.gSummaryChanged(input)

      case 'toggle':
        let value = input === true ? 0 : 1;
        return this.props.gPublicChanged(value)

      case 'create':
        const { name, organizer, summary, isPublic } = this.props
        return this.props.gCreate(name, organizer, summary, isPublic)
          .then(() => this.props.history.push('/welcome'))
          .catch(err => console.log(err))

      default:
        console.log('error')
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
        <View style={styles.header}>
          <View style={styles.bubble}></View>
        </View>
        <View style={styles.firstBox}>
          <TextInput
            style={styles.textInputOne}
            placeholder={"Name"}
            value={this.props.name}
            onChangeText={text => this.onChange(text, 'name')}
          />
          <TextInput
            style={styles.textInputOne}
            placeholder={"Organizer"}
            value={this.props.organizer}
            onChangeText={text => this.onChange(text, 'organizer')}
            />
        </View>
        <View style={styles.summaryBox}>
          <TextInput
            style={styles.sum}
            placeholder={"Summary"}
            multiline = {true}
            value={this.props.summary}
            onChangeText={text => this.onChange(text, 'summary')}
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
            onToggle={boolean => this.onChange(boolean, 'toggle')}
            />

            <TouchableOpacity
              onPress={() => this.onChange(null, 'create')}
              style={styles.button}>
                {
                  this.props.loading === 'true'
                  ? <ActivityIndicator size="small" color="#0097A7" />
                  : <Text style={{fontWeight: 'bold'}}> Create </Text>
                }
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


export default connect(mapStateToProps,
 {  gNameChanged,
  gOrganizerChanged,
  gSummaryChanged,
  gPublicChanged,
  gLoadingChanged,
  gCreate
 }
)(createGroup);
