// Navigation
import React, { Component } from 'react';
import ReactNative from 'react-native'

const {
  View,
  Text,
  StatusBar,
  NavigationExperimental: Navigation,
  TouchableOpacity,
} = ReactNative

import LoginScreen from './LoginScreen'
import TaskLists from './TaskLists'

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
  Header: NavHeader,
} = Navigation

const reduceNavState = (navState, action) => {
  const {type, key} = action;
  switch (type) {
    case 'push':
      const route = {key}
      return NavStateUtils.push(navState, route)
    case 'pop':
      return NavStateUtils.pop(navState)
    default:
      return navState
  }
}

const renderHeaderRight = (sceneProps) => {
  const routeKey = sceneProps.scene.route.key
  let buttonText = ''
  // TODO this logic should go into individual screens, right?
  if (routeKey.startsWith('task_list')) {
    buttonText = 'Add'
  } else if (routeKey.startsWith('edit_task')) {
    buttonText = 'Save'
  }
  return (
    <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems: 'center', padding: 15}}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const Header = ({...sceneProps, goBack}) => (
  <NavHeader
    {...sceneProps}
    renderTitleComponent={() => (<NavHeader.Title>Todo Wonder</NavHeader.Title>)}
    renderRightComponent={renderHeaderRight.bind(null, sceneProps)}
    onNavigateBack={goBack}
    />
)

class TWNavigator extends Component {
  constructor(props, context) {
    super(props, context)
    this._renderScene = this._renderScene.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
    this._goBack = this._navigate.bind(this, 'pop')
  }
  render() {
    return (
      <NavCardStack
        renderScene={this._renderScene}
        renderOverlay={this._renderHeader}
        navigationState={this.props.navigationState}
        onNavigateBack={this._goBack}
        />
    )
  }
  _renderHeader(sceneProps) {
    return (
      <Header {...sceneProps} goBack={this._goBack}/>
    )
  }
  _renderScene(sceneProps) {
    const routeKey = sceneProps.scene.route.key
    switch (routeKey) {
      case 'login_screen':
        return <LoginScreen {...sceneProps} />
      case 'task_list_priority':
        return <TaskLists {...sceneProps} selectedTab="Priority" />
      case 'task_list_duration':
        return <TaskLists {...sceneProps} selectedTab="Duration" />
      case 'task_list_done':
        return <TaskLists {...sceneProps} selectedTab="Done" />
      default:
        return <Text>Unknown route: {routeKey}</Text>
    }
  }
  _navigate(action) {
    const newNavState = reduceNavState(this.state.navigation, action)
    if (newNavState !== this.state.navigation) {
      this.setState({
        navigation: newNavState,
      })
    }
  }
}

module.exports = TWNavigator
