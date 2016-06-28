/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <View>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  }
})

module.exports = Button
