import {
  GROUP_CREATE_NAME_CHANGED,
  GROUP_CREATE_ORGANIZER_CHANGED,
  GROUP_CREATE_SUMMARY_CHANGED,
  GROUP_CREATE_PUBLIC_CHANGED,
  GROUP_CREATE_LOADING_CHANGED,
  GROUP_CREATE_PRESS,
  GROUP_CREATE_SUCCESS
} from './types'
import firebase from 'firebase'

export const gNameChanged = text => {
  return {
    type: GROUP_CREATE_NAME_CHANGED,
    payload: text
  }
}

export const gOrganizerChanged = text => {
  return {
    type: GROUP_CREATE_ORGANIZER_CHANGED,
    payload: text
  }
}

export const gSummaryChanged = text => {
  return {
    type: GROUP_CREATE_SUMMARY_CHANGED,
    payload: text
  }
}

export const gPublicChanged = text => {
  return {
    type: GROUP_CREATE_PUBLIC_CHANGED,
    payload: text
  }
}

export const gLoadingChanged = text => {
  return {
    type: GROUP_CREATE_LOADING_CHANGED,
    payload: text
  }
}

export const gCreate = (name, organizer, summary, isPublic) => {
  const { currentUser } = firebase.auth();
  const { uid } = currentUser;
  ///users/${currentUser.uid}/groups
  return async dispatch => {
    try {
      const response = await firebase.database().ref(`/groups/${name}${uid}`)
        .push({
           name,
          organizer,
          summary,
          isPublic,
          owner: uid,
        })
      const { key } = response
      await firebase.database().ref(`/users/${uid}`).push({ owner: uid })
      dispatch({ type: GROUP_CREATE_SUCCESS })
    } catch (e) { console.log(e) }
  }

}
