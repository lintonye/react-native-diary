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

const {PropTypes} = React

const tabs = ['Priority', 'Duration', 'Done']
const tabComponents = [PriorityTab]

class TaskLists extends React.Component {
  static propTypes: {
    selectedTab: PropTypes.string, // TODO change to oneOf(tabs)
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
