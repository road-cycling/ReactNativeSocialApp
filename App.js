import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { MemoryRouter, Route, Switch } from 'react-router-native'
import reducers from './src/reducers'
import firebase from 'firebase'
import Login from './src/components/login'
import Welcome from './src/components/welcome';
import createGroup from './src/components/createGroup'
import myGroups from './src/components/myGroups'
import thunk from 'redux-thunk';

//import { Switch } from 'react-router-native'



class App extends Component {

  componentWillMount() {
    console.log(myGroups)
    const config = {
      apiKey: "AIzaSyBwTS9J6NvkQLIIUm6cr_dB1OBQVSYeAEU",
      authDomain: "ssuproject-4980c.firebaseapp.com",
      databaseURL: "https://ssuproject-4980c.firebaseio.com",
      projectId: "ssuproject-4980c",
      storageBucket: "ssuproject-4980c.appspot.com",
      messagingSenderId: "289341777797"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <MemoryRouter>
          <View style={{ flex: 1 }}>
            <Switch>
              <Route path="/"   exact component={Login} />
              <Route path="/welcome"  component={Welcome} />
              <Route path="/group" component={createGroup} />
              <Route path="/mygroups" exact component={myGroups} />
            </Switch>
          </View>
        </MemoryRouter>
      </Provider>
    );
  }
}

export default App;
















/*
Will
path
*/
