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
import TaskRow from './TaskRow'

const mockTasks = [
  { title: 'Meditation', estimates: 'minutes', isDone: false, section: 'today'},
  { title: 'Call CRA', estimates: '1/2 hour', isDone: false, section: 'today'},
  { title: 'Read React Native Tutorials - http://reactnativediary.com', estimates: '1/2 hour', isDone: false, section: 'today'},
  { title: 'Write RND post', estimates: '1 hour', isDone: false, section: 'today'},
  { title: 'Eat lunch', estimates: '1 hour', isDone: false, section: 'some day'},
  { title: 'Have dinner', estimates: '1 hour', isDone: false, section: 'some day'},
  { title: 'Something done', estimates: '1 hour', isDone: true, section: 'some day'},
]

const tasksToSections = (tasks) => tasks.reduce((prev, task) => {
  const s = prev[task.section]
  if (s) s.push(task)
  else {
    prev[task.section] = [task]
  }
  return prev
}, {})

class DurationTab extends React.Component {
  constructor(props, context) {
    super(props, context)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(mockTasks)
    }
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    )
  }
  _renderRow(rowData) {
    return <TaskRow {...this.props} task={rowData} />
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

module.exports = DurationTab
