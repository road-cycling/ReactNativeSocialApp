import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'


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


/* <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate} /> */
class adminPanel extends Component {

  state = {
    chosenDate: new Date()
  }

  setDate = (chosenDate) => {
    this.setState({ chosenDate })
  }

  componentWillMount() {
    let tempID = '-L84RWUQJeBFhTv80E7g';
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
          <Text style={{fontSize: 25}}> Create Event </Text>
        </View>
        <View style={styles.firstBox}>
          <TextInput
            style={styles.textInputOne}
            placeholder={"Location"}
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
        <View style={styles.rest}>
        <DatePickerIOS
date={this.state.chosenDate}
onDateChange={this.setDate}
/>

        </View>
        <View style={styles.tBox}>
            <TouchableOpacity
              onPress={() => {}}
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
  return {}
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
    width: '70%',
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
    height: '15%',
    backgroundColor: '#26C6DA',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: '40%',
    backgroundColor: '#00838F',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rest: {
    flex: 1,
    backgroundColor: '#26C6DA'
  }
})


export default connect(mapStateToProps)(adminPanel);
