
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
      navigation: {
        index: 0,
        routes: [{key: 'login_screen'}]
      }
    }
  }
  render() {
    return (
      <TWNavigator navigationState={this.state.navigation}>
      </TWNavigator>
    )
  }
}

module.exports = TodoWonder
