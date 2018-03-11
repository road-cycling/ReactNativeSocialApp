import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight } from 'react-native'
import { emailChanged, passwordChanged, aMethodChanged, nameChanged, loginUser } from '../actions'
import { connect } from 'react-redux'
//import ImagePicker from 'react-native-image-picker';


class Login extends Component {

  componentDidMount() {
    /*
    Permissions.checkMultiple(['photo', 'camera']).then(response => {
      if
      console.log(response)
    }) */

  }
/*
  onSetImage() {
    var options = {
      title: 'Select Avatar',

    };

    ImagePicker.launchImageLibrary(options, (response, error)  => {
    console.log(reponse)
    console.log(error)
});
}
*/
  onButtonPress() {
    const { email, password, name, authMethod } = this.props;
    this.props.loginUser(email, password, name, authMethod)
      .then(() => this.props.history.push('/welcome'))
  }

  updateMethod(method) {
    let authMethod = method === 'SI' ? 0 : 1;
    this.props.aMethodChanged(authMethod)
  }

  onNameChange(text) {
    this.props.nameChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  getInput() {
    let inputOne = [<TextInput key={0} onChangeText={text => this.onEmailChange(text)} value={this.props.email} style={styles.textInput} placeholder={"Email"} />,
                    <TextInput key={1} onChangeText={text => this.onPasswordChange(text)} value={this.props.password}  secureTextEntry={true} style={styles.textInput} placeholder={"Password"} />]
    let inputTwo =  <TextInput key={2} onChangeText={text => this.onNameChange(text)} value={this.props.name} style={styles.textInput} placeholder={"Name"} />

    return this.props.authMethod === 0 ? inputOne : [inputTwo, ...inputOne]
  }

  buttonOrLoad() {
    return this.props.loading ?
      <ActivityIndicator size="small" color="#0097A7" />
      : <Text style={{color: '#FFF'}}> {this.props.authMethod === 0 ? 'Log In' : 'Sign Up'} </Text>
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View>
            <TouchableHighlight onPress={() => this.onSetImage()}>
              <Image
                style={this.props.error == '' ? styles.bubble : styles.bubbleRed}

              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.mid}>

          <TouchableOpacity
            onPress={() => this.updateMethod('SI')}
            style={[styles.loginSignup, styles.leftButton]}>
            <Text style={{color: '#0097A7'}}> Sign In </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.updateMethod('SU')}
            style={[styles.loginSignup, styles.rightButton]}>
            <Text style={{color: '#0097A7'}}> Sign Up </Text>
          </TouchableOpacity>

        </View>
        <View style={styles.midPad}></View>
        <View style={styles.end}>
          {this.getInput()}
          <TouchableOpacity
            onPress={() => this.onButtonPress()}
            style={styles.button} >
            {this.buttonOrLoad()}
          </TouchableOpacity>


        </View>
    </View>
    );
  }
}

const mapStateToProps = state => {
  let {
    authMethod,
    email,
    password,
    name,
    error,
    user,
    loading
  } = state.loginReducer

  return {
    authMethod,
    email,
    password,
    name,
    error,
    user,
    loading
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    width: 120,
    height: 120,
    backgroundColor: '#0097A7',
    borderRadius: 100
  },
  bubbleRed: {
    width: 90,
    height: 90,
    backgroundColor: '#FFA07A',
    borderRadius: 100
  },
  top: {
    height: '40%',
    backgroundColor: '#00ACC1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mid: {
    height: '5%',
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  midPad: {
    height: '5%',
    backgroundColor: '#26C6DA'
  },
  end: {
    height: '50%',
    backgroundColor: "#26C6DA",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textInput: {
    width: '70%',
    padding: 12,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0.5,
    borderColor: '#fff'
  },
  button: {
    borderWidth: 0.5,
    width: '50%',
    height: '8%',
    borderColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginSignup: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    width: '25%',
    height: '60%',
  },
  leftButton: {
    borderBottomLeftRadius: 20,
    alignItems: 'flex-end',
    marginRight: 2,
    paddingRight: 20
  },
  rightButton: {
    borderBottomRightRadius: 20,
    paddingLeft: 10
  },
  picture: {
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, aMethodChanged, nameChanged, loginUser }
)(Login);
