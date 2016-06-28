/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'
import Button from './Button'

const LoginScreen = () => (
  <View style={styles.container}>
    <Text>Enter your email address below</Text>
    <TextInput style={styles.textInput}
       />
    <Button title='Start' />
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  textInput: {
    alignSelf: 'stretch',
  }
})

module.exports = LoginScreen
