
/**
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native'
import TWNavigator from './TWNavigator'

const {
  View,
  Text,
  StatusBar,
} = ReactNative

class TodoWonder extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      email: 'joe.doe@email.com',
      navigation: {
        index: 0,
        routes: [{key: 'task_list_priority'}]
      },
    }
  }
  render() {
    return (
      <TWNavigator navigationState={this.state.navigation}
        {...this.state}
        />
    )
  }
}

module.exports = TodoWonder
