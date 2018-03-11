import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AMETHOD_CHANGED,
  NAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types'
import { browserHistory } from 'react-router-native'
import firebase from 'firebase';


export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const aMethodChanged = text => {
  return {
    type: AMETHOD_CHANGED,
    payload: text
  }
}

export const nameChanged = text => {
  return {
    type: NAME_CHANGED,
    payload: text
  }
}

export const loginUser = (email, password, name, authMethod) => {
  if (authMethod === 0) {
    return async dispatch => {
      try {
        dispatch({ type: LOGIN_USER });
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        loginUserSuccess(dispatch, user);
      } catch (e){
        console.log(e)
        loginUserFail(dispatch)
      }
    }
  } else {
    return async dispatch => {
      try {
        dispatch({ type: LOGIN_USER });
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await user.updateProfile({ displayName: name })
        loginUserSuccess(dispatch, user)
      } catch (e){
        console.log(e)
        loginUserFail(dispatch)
      }
    }
  }
}

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });


}
