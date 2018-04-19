import React, { Component } from 'react'
import { Link } from 'react-router-native'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'


const styles = StyleSheet.create({
  Visual: {
    padding: 5,
    backgroundColor: '#0097A7',
    borderRadius: 40,
    marginRight: 20
  },
  morePad: {
    padding: 6
  }
})

const AdminButton = ({ ownerUID, userUID, inGroup, linkData, joinGroup, leaveGroup }) => {

  ownerUID = undefined
  inGroup = 1

  if (ownerUID !== undefined && ownerUID === userUID) {
    return (
      <Link
        style={styles.Visual}
        to={`/adminPanel/currentlyBroken`}>
        <Text> Admin Tools </Text>
      </Link>
    )
  } else if (inGroup){
    return (
      <TouchableOpacity
        onPress={() => leaveGroup()}
        style={[styles.Visual,  styles.morePad]}
      >
      <Text>
        LEAVE GROUP
      </Text>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        onPress={() => joinGroup()}
        style={[styles.Visual, styles.morePad]}
      >
        <Text>
          JOIN GROUP
        </Text>
      </TouchableOpacity>

    )
  }

//  return (<View />)
}

export { AdminButton };
