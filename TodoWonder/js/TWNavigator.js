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
import EditTask from './EditTask'

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

const renderHeaderRight = (sceneProps, onNavigate) => {
  const routeKey = sceneProps.scene.route.key
  let buttonText = ''
  // TODO this logic should go into individual screens, right?
  let onPress = null
  if (routeKey.startsWith('task_list')) {
    buttonText = 'Add'
    onPress = () => onNavigate(null, {key: 'edit_task'})
  } else if (routeKey.startsWith('edit_task')) {
    buttonText = 'Save'
  }
  return (
    <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems: 'center', padding: 15}}
      onPress={onPress}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const Header = ({...sceneProps, onNavigate}) => (
  <NavHeader
    {...sceneProps}
    renderTitleComponent={() => (<NavHeader.Title>Todo Wonder</NavHeader.Title>)}
    renderRightComponent={renderHeaderRight.bind(null, sceneProps, onNavigate)}
    onNavigateBack={onNavigate.bind(null, null, {type: 'pop'})}
    />
)

class TWNavigator extends Component {
  constructor(props, context) {
    super(props, context)
    this._renderScene = this._renderScene.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
    this._navigate = this._navigate.bind(this)
    this._goBack = this._navigate.bind(this, null, {type: 'pop'})
    const taskListRoute = {
      key: 'task_list',
      // tabs
      navigation: {
        index: 0,
        routes: [{key: 'priority'}, {key: 'duration'}, {key: 'done'}]
      }
    }
    this._gotoTaskList = () => {
      // this._navigate((state, action) => NavStateUtils.replaceAtIndex(state, 0, {key:'task_list-0'}))
      // this._navigate((state, action) => NavStateUtils.jumpToIndex(state, 1))
      this._navigate((state, action) =>
        NavStateUtils.replaceAtIndex(state, state.index, taskListRoute))
    }
    this.state = {
      navigation: {
        index: 0,
        routes: [
          props.email ? taskListRoute : {key: 'login_screen', },
          // {key: 'edit_task', taskId: 'abc1'},
        ],
      },
    }
  }
  render() {
    return (
      <NavCardStack
        renderScene={this._renderScene}
        renderOverlay={this._renderHeader}
        navigationState={this.state.navigation}
        onNavigateBack={this._goBack}
        />
    )
  }
  _renderHeader(sceneProps) {
    return (
      <Header {...sceneProps} onNavigate={this._navigate}/>
    )
  }
  _renderScene(sceneProps) {
    const route = sceneProps.scene.route
    switch (route.key) {
      case 'login_screen':
        return <LoginScreen {...sceneProps} gotoTaskList={this._gotoTaskList}/>
      case 'edit_task':
        return (<EditTask {...sceneProps} goBack={this._goBack}
          taskId={sceneProps.scene.route.taskId} />
        )
      case 'task_list':
        return (
          <TaskLists {...sceneProps}
            navigationState={route.navigation}
            onNavigateTab={(tabIndex) => {
              const newChildNavState = NavStateUtils.jumpToIndex(route.navigation, tabIndex)
              const newRoutes = this.state.navigation.routes.map((r) => {
                return r.key !== route.key ? r : {key: route.key, navigation: newChildNavState}
              })
              this.setState({
                navigation: {
                  ...this.state.navigation,
                  routes: newRoutes,
                }
              })
            }}
            onEditTask={(taskId) =>
              this._navigate((state) =>
                NavStateUtils.push(state, {key: 'edit_task', taskId}))}
          />
        )
      default:
        return <Text>Unknown route: {routeKey}</Text>
    }
  }
  _navigate(reducer, action) {
    const newNavState = (reducer || reduceNavState)(this.state.navigation, action)
    if (newNavState !== this.state.navigation) {
      this.setState({
        navigation: newNavState,
      })
    }
  }
}

module.exports = TWNavigator
