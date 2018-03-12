import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native'
import {
  IMAGE_UPLOAD_WELCOME,
  NAME_CHANGE_WELCOME,
  NEW_IMAGE_WELCOME
} from './types'



export const imageUploadWelcome = text => {
  return {
    type: IMAGE_UPLOAD_WELCOME,
    payload: text
  }
}

export const newImage = (uri, mime = 'image/jpg') => {
  //dispatch({  })
  return dispatch => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      let uploadBlob = null
      const { currentUser } = firebase.auth();
      const { uid } = currentUser;
      const imageRef = firebase.storage().ref(`/posts/${uid}`)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        currentUser.updateProfile({ photoURL : url })
        console.log('done')
        dispatch({
          type: IMAGE_UPLOAD_WELCOME,
          payload: url
        })
      })
      .catch((error) => {
        console.log(error)
        console.log('thiscodesucks')
      })
  })
  }
}

export const onStartWelcomePage = () => {
  return async dispatch => {
    var { displayName, photoURL } =  firebase.auth().currentUser;
    dispatch({
      type: NAME_CHANGE_WELCOME,
      payload: displayName
    })
    dispatch({
      type: IMAGE_UPLOAD_WELCOME,
      payload: photoURL
    })
  }
}
