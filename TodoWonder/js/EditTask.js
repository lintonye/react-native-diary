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

const mockTask = {
  title: 'Meditation',
  estimates: 'minutes',
  isDone: false,
  section: 'today'
}

class EditTask extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <View>
        <Text>Edit Task</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    padding: 15,
    marginTop: 5,
    backgroundColor: '#CCCCCC',
  }
})

module.exports = EditTask
