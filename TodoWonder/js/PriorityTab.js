/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
} from 'react-native'

class PriorityTab extends React.Component {
  render() {
    return (
      <Text>Priority tasks</Text>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  }
})

module.exports = PriorityTab
