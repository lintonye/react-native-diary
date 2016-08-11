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
  { id:'t1', title: 'Meditation', estimates: 'minutes', isDone: false, section: 'today'},
  { id:'t2', title: 'Call CRA', estimates: '1/2 hour', isDone: false, section: 'today'},
  { id:'t3', title: 'Read React Native Tutorials - http://reactnativediary.com', estimates: '1/2 hour', isDone: false, section: 'today'},
  { id:'t4', title: 'Write RND post', estimates: '1 hour', isDone: false, section: 'today'},
  { id:'t5', title: 'Eat lunch', estimates: '1 hour', isDone: false, section: 'some day'},
  { id:'t6', title: 'Have dinner', estimates: '1 hour', isDone: false, section: 'some day'},
  { id:'t7', title: 'Something done', estimates: '1 hour', isDone: true, section: 'some day'},
]

const tasksToSections = (tasks) => tasks.reduce((prev, task) => {
  const s = prev[task.section]
  if (s) s.push(task)
  else {
    prev[task.section] = [task]
  }
  return prev
}, {})

class PriorityTab extends React.Component {
  constructor(props, context) {
    super(props, context)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(tasksToSections(mockTasks))
    }
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
      />
    )
  }
  _renderRow(rowData) {
    return <TaskRow task={rowData}  {...this.props}/>
  }
  _renderSectionHeader(sectionData, section) {
    return (
      <Text style={styles.sectionHeader}>{section}</Text>
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

module.exports = PriorityTab
