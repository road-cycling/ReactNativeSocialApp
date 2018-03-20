import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { onStartWelcomePage, newImage } from '../actions';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Image as RNImage
} from 'react-native'

/*

  TODO
  CACHE IMAGES;

*/

class Welcome extends Component {

  componentWillMount() {
    this.props.onStartWelcomePage()
  }

  onSetImage() {
    let options = {
      title: 'Select Avatar',

    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let { uri } = response;
        this.props.newImage(uri)
      }
    });
  }

  onButtonPress(data) {
    this.props.history.push(
      data === 'group'
      ? '/group'
      : '/joingroup'
    )
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
            <TouchableHighlight onPress={() => this.onSetImage()} style={{ borderRadius: 100 }}>
          {
            this.props.uri === null ? (
              <RNImage
                style={styles.picture1}
                source={require('../image/reactNative.png')}
              />
            ) : (
              <Image
                style={styles.picture}
                imageStyle={{ borderRadius: 100 }}
                source={{uri: this.props.uri }}
                indicator={Progress.Circle}
              />
            )
          }
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.bodyEnd}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Hello {this.props.name}</Text>
        </View>
        <View style={styles.end}>
          <TouchableOpacity
            onPress={() => this.onButtonPress('group')}
            style={styles.bottomBox}>
            <Text style={styles.boxColor}> Create Group </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onButtonPress('joingroup')}
            style={styles.bottomBox}>
            <Text style={styles.boxColor}> Join Groups </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

}

function mapStateToProps(state) {
  let {
    uri,
    name,
    loading
  } = state.welcomeReducer;
  return {
    uri,
    name,
    loading
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

  },
  picture1: {
  width: 130,
  height: 130,
  borderRadius: 100,

}
})

export default connect(mapStateToProps, { onStartWelcomePage, newImage })(Welcome);
