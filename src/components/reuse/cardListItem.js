import React, { Component } from 'react'
import { Link } from 'react-router-native'

import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native'

import { Card, ListItem, Button, SearchBar } from 'react-native-elements'

//context api?
const CardListItem = ({ events, eventType}) => {
  return (
    <View>
      <Text style={{alignSelf: 'center'}}> { events.length == 0 ? "" : eventType } </Text>
      <FlatList
        data={events}
        renderItem={u =>
          <Card containerStyle={{flex: 1, padding: 0}} >
              <ListItem
                key={ u.index }
                title={ u.item.location }
                subtitle={ u.item.summary + " " + u.item.chosenDate }
                containerStyle={{ backgroundColor: '#00BCD4', borderBottomColor: 'white' }}
                titleStyle={{ color: 'black' }}
                subtitleStyle={{ color: '#0097A7' }}
              />
          </Card>
        }
      />
    </View>
  )
}

export { CardListItem }
