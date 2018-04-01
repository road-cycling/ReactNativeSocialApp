import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { MemoryRouter, Route, Switch } from 'react-router-native'
import reducers from './src/reducers'
import firebase from 'firebase'

import thunk from 'redux-thunk'

import {
  Login,
  Welcome,
  createGroup,
  myGroups,
  joinGroup,
  viewGroup,
  createEvent,
  newAdminPanel,
  viewMembers
} from './src/components'

class App extends Component {

  componentWillMount() {
    //console.log(myGroups)
    /*
    const config = {
      apiKey: "AIzaSyBwTS9J6NvkQLIIUm6cr_dB1OBQVSYeAEU",
      authDomain: "ssuproject-4980c.firebaseapp.com",
      databaseURL: "https://ssuproject-4980c.firebaseio.com",
      projectId: "ssuproject-4980c",
      storageBucket: "ssuproject-4980c.appspot.com",
      messagingSenderId: "289341777797"
    };*/

    var config = {
      apiKey: "AIzaSyBpjJRLWYAaZvxjGqoTj5OIMagA_6aWJNg",
      authDomain: "dolphons-b45a8.firebaseapp.com",
      databaseURL: "https://dolphons-b45a8.firebaseio.com",
      projectId: "dolphons-b45a8",
      storageBucket: "dolphons-b45a8.appspot.com",
      messagingSenderId: "650827752725"
    };
//firebase.initializeApp(config);
    firebase.initializeApp(config);
  }

  render() {

    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <MemoryRouter>
          <View style={{ flex: 1 }}>
            <Switch>  
              <Route path="/"         exact component={Login} />
              <Route path="/welcome"        component={Welcome} />
              <Route path="/group"          component={createGroup} />
              <Route path="/mygroups" exact component={myGroups} />
              <Route path="/joingroup"      component={joinGroup} />
              <Route path="/getGroup/:group" component={viewGroup} />
              <Route path="/createEvent/:group"  component={createEvent} />
              <Route path="/adminPanel/:group" component={newAdminPanel} />
              <Route path="/members/:group"   component={viewMembers} />
            </Switch>
          </View>
        </MemoryRouter>
      </Provider>
    );
  }
}

export default App;

/*
<Route path="/getGroup/:group" component={viewGroup} />
*/

/*
<Route
  path='/dashboard'
  render={(props) => <Dashboard {...props} isAuthed={true} />}
/>
*/










/*
<Route path="/"               component={adminPanel} />
<Route path="/"         exact component={Login} />
<Route path="/welcome"        component={Welcome} />
<Route path="/group"          component={createGroup} />
<Route path="/mygroups" exact component={myGroups} />
<Route path="/joingroup"      component={joinGroup} />
<Route path="/getGroup/:group" component={viewGroup} />
*/




/*
Will
path
*/
