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
import '@firebase/firestore'

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
  const { currentUser: { uid, displayName } } = firebase.auth()
  const lower_name = name.toLowerCase();
  let firestore = firebase.firestore()
  console.log(firestore)

  return async dispatch => {
    try {
      dispatch({ type: GROUP_CREATE_PRESS })
      /* this needs to be batched */
      const resp = await firestore.collection('groups')
            .add({
              name,
              organizer,
              summary,
              isPublic,
              lower_name,
              owner: uid,
              displayName
            })
      let { id } = resp;

      const add = await firestore.collection('users')
          .doc(uid)
          .collection('groupsApartOf')
          .add({ groupID: id, name, organizer });

      //id = add.id

      await firestore.collection('groups')
          .doc(id)
          .collection('events')
          .add({
            location: 'Group Created',
            summary: 'Group Created',
            chosenDate: new Date().toString()
          })

      await firestore.collection('groups')
          .doc(id)
          .collection('users')
          .add({ displayName, userID: uid, owner: true, admin: true, deleteID: 'dontneed' })

      dispatch({ type: GROUP_CREATE_SUCCESS })

      return;
    } catch (e) { console.log(e) }
  }

}
