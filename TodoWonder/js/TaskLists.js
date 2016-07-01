/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SegmentedControlIOS,
  ScrollView,
} from 'react-native'

import Button from './Button'
import PriorityTab from './PriorityTab'
import DurationTab from './DurationTab'
import DoneTab from './DoneTab'

const {PropTypes} = React

const tabs = ['Priority', 'Duration', 'Done']
const tabComponents = [PriorityTab, DurationTab, DoneTab]

class TaskLists extends React.Component {
  static propTypes: {
    selectedTab: PropTypes.string, // TODO change to oneOf(tabs)
    switchTab: PropTypes.func.isRequired,
  }
  render() {
    const tabIndex = tabs.indexOf(this.props.selectedTab)
    const Tab = tabComponents.find((c) => c.name === `${this.props.selectedTab}Tab`)
    return (
      <View style={{flex: 1}}>
        <SegmentedControlIOS
          values={tabs}
          selectedIndex={tabIndex}
          style={styles.tabs}
          onValueChange={(tab) => this.props.switchTab(`task_list_${tab.toLowerCase()}`)}
          />
        <Tab />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  tabs: {
    marginTop: 70, //TODO Why need this margin???
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  }
})

module.exports = TaskLists
