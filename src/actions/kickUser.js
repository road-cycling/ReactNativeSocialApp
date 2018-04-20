import firebase from 'firebase';
import '@firebase/firestore'


//not part of redux state

export const kickUser = async (userID, groupID) => {

  try {

    console.log(`userID is ${userID} \n and groupID is ${groupID}`)

    let groupRef = await firebase.firestore()
              .collection('groups')
              .doc(groupID)
              .collection('users')
              .where('userID', '==', userID)
              .get()

    groupRef.forEach(item => item.ref.delete())

    let userRef = await firebase.firestore()
              .collection('users')
              .doc(userID)
              .collection('groupsApartOf')
              .where('groupID', '==', groupID)
              .get()


    userRef.forEach(item => item.ref.delete())

  } catch (e) {
    console.log('Error in Kick User')

  }
}

export const userJoinGroup = async (userID, groupID, name) => {
  try {
    const add = await firebase.firestore()
        .collection('users')
        .doc(userID)
        .collection('groupsApartOf')
        .add({
          groupID,
          name,
          organizer: "fooBaz"
         });

    await firebase.firestore()
        .collection('groups')
        .doc(groupID)
        .collection('users')
        .add({
          displayName: "ADD",
          userID,
          owner: false,
          admin: false,
          deleteID: 'Dont need this no more'
        })

  } catch (e){
    console.log('CAUGHT!')
  }
}
