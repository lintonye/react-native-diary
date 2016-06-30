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

class TaskRow extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.grab}>## </Text>
        <Text style={styles.taskTitle}>{this.props.task.title}</Text>
        <Text>{this.props.task.estimates}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    backgroundColor: 'white',
    // shadow styles below are iOS only
    shadowColor: '#888888',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  grab: {
    alignSelf: 'center',
  },
  taskTitle: {
    alignSelf: 'flex-start',
    flex: 1,
  }
})

module.exports = TaskRow
