import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import { Link } from 'react-router-native'


class Welcome extends Component {

  onButtonPress() {
    this.props.history.push('/group')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.room}></View>
          <TouchableOpacity
            style={styles.headerButton}>
            <Link
              to='/mygroups'>
              <Text style={{color: '#FFF'}}> My Groups </Text>
            </Link>

          </TouchableOpacity>
          <View style={styles.small}></View>
        </View>
        <View style={styles.body1}></View>
        <View style={styles.body}>
          <View>
            <TouchableHighlight onPress={() => this.onSetImage()}>
              <Image
                style={styles.picture}
                source={require('../image/reactNative.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.bodyEnd}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Hello {this.props.displayName}</Text>
        </View>
        <View style={styles.end}>
          <TouchableOpacity
            onPress={() => this.onButtonPress()}
            style={styles.bottomBox}>
            <Text style={styles.boxColor}> Create Group </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={styles.bottomBox}>
            <Text style={styles.boxColor}> Join Groups </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

}

function mapStateToProps(state) {

  let { user } = state.loginReducer;
  let { providerData } = user;
  let displayName = providerData[0].displayName;
  return {
    user,
    displayName
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  header: {
    height: '10%',
    backgroundColor: '#0097A7',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10

  },
  room: {
    flex: 4
  },
  headerButton: {
    flex: 1.3,
    borderWidth: 0.5,
    padding: 5
  },
  small: {
    flex: .1
  },
  body: {
    height: '20%',
    backgroundColor: '#00BCD4',
    flexDirection:'row',
    justifyContent: 'center',
  },
  body1: {
    height: '17%',
    backgroundColor: '#00BCD4',
  },
  bodyEnd: {
    height: '43%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00BCD4',

  },
  end: {
    height: '11%',
    backgroundColor: 'green',
    flexDirection: 'row'
  },
  bottomBox: {
    flex: 1,
    backgroundColor: '#0097A7',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxColor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
  picture: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: 'white'
  }
})

export default connect(mapStateToProps, null)(Welcome);
