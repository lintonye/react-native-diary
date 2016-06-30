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

const LoginScreen = ({initialEmail}) => (
  <View style={styles.container}>
    <Text>Enter your email address below:</Text>
    <TextInput style={styles.textInput}
      defaultValue={initialEmail}
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
    height: 50,
    borderWidth: 1,
    margin: 20,
  }
})

module.exports = LoginScreen
