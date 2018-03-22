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
  const lower_name = name.toLowerCase();
  ///users/${currentUser.uid}/groups
  return async dispatch => {
    try {
      dispatch({ type: GROUP_CREATE_PRESS })
      //const response = await firebase.database().ref(`/groups/${name}${uid}`)
      const response = await firebase.database().ref(`/groups/`)
        .push({
           name,
          organizer,
          summary,
          isPublic,
          lower_name,
          owner: uid,
        })
      const { key } = response
      //console.log(key);
      await firebase.database().ref(`/users/${uid}`).push({ key })
      await firebase.database().ref(`/events/${key}`).push({
        location: 'Group Created',
        summary: 'Group Created',
        chosenDate: new Date().toString()
      })
      dispatch({ type: GROUP_CREATE_SUCCESS })
      return;
    } catch (e) { console.log(e) }
  }

}
