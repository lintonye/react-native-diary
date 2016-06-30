/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'

class TaskRow extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Image source={require('./images/ic_drag_handle.png')} style={styles.grab} />
        <Text style={styles.taskTitle}>{this.props.task.title}</Text>
        <Text>{this.props.task.estimates}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
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
    marginRight: 10,
  },
  taskTitle: {
    flex: 1,
  }
})

module.exports = TaskRow
