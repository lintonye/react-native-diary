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
import NavigationPager from './NavigationPager'

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
  render() {
    return (
      <View style={{flex: 1}}>
        <SegmentedControlIOS
          values={tabs}
          selectedIndex={this.props.navigationState.index}
          onChange={this._onSwitchTab}
          style={styles.tabs}
          />
        <NavigationPager
          navigationState={this.props.navigationState}
          renderScene={this._renderScene}
          navigatePage={this.props.onNavigateTab}
          />
      </View>
    )
  }
  _onSwitchTab(event) {
    const tabIndex = event.nativeEvent.selectedSegmentIndex
    this.props.onNavigateTab(tabIndex)
  }
  _renderScene(sceneProps) {
    const Tab = tabComponents[sceneProps.scene.index]
    return <Tab {...sceneProps} onEditTask={this.props.onEditTask}/>
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
