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
  NavigationExperimental,
} from 'react-native'

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
} = NavigationExperimental

import Button from './Button'
import PriorityTab from './PriorityTab'
import DurationTab from './DurationTab'
import DoneTab from './DoneTab'

const {PropTypes} = React

const tabs = ['Priority', 'Duration', 'Done']
const tabComponents = [PriorityTab, DurationTab, DoneTab]

class TaskLists extends React.Component {
  constructor(props, context) {
    super(props, context)
    this._renderScene = this._renderScene.bind(this)
    this._onSwitchTab = this._onSwitchTab.bind(this)
  }
  static propTypes: {
    // selectedTab: PropTypes.string, // TODO change to oneOf(tabs)
    // switchTab: PropTypes.func.isRequired,
  }
  _getActiveTabIndex() {
    const {index, routes} = this.props.navigationState
    const { key } = routes[index]
    if (key) {
      const m = key.match(/task_list-(\d+)/)
      return m && m[1] ? Number.parseInt(m[1]) : 0
    } else return 0
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <SegmentedControlIOS
          values={tabs}
          selectedIndex={this._getActiveTabIndex()}
          onChange={this._onSwitchTab}
          style={styles.tabs}
          />
        <NavCardStack
          navigationState={this.props.navigationState}
          renderScene={this._renderScene}
          />
      </View>
    )
  }
  _onSwitchTab(event) {
    const tabIndex = event.nativeEvent.selectedSegmentIndex
    // state: {index:0, routes:[{key, tabIndex}]}
    this.props.onNavigate((state, action) => {
      return NavStateUtils.replaceAtIndex(state, 0, {key: `task_list-${tabIndex}`})
    })
  }
  _renderScene(sceneProps) {
    const Tab = tabComponents[this._getActiveTabIndex()]
    return <Tab />
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
