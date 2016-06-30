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

const {PropTypes} = React

const tabs = ['Priority', 'Duration', 'Done']

class TaskLists extends React.Component {
  static propTypes: {
    selectedTab: PropTypes.string, // TODO change to oneOf(tabs)
  }
  render() {
    const tabIndex = tabs.indexOf(this.props.selectedTab)
    return (
      <View style={{flex: 1}}>
        <SegmentedControlIOS
          values={tabs}
          selectedIndex={tabIndex}
          style={styles.tabs}
          />
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
  }
})

module.exports = TaskLists
