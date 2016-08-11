/**
 * @flow
 */

import React from 'react'
import {
  View,
  StyleSheet,
  NavigationExperimental,
} from 'react-native'

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
  Transitioner: NavTransitioner,
} = NavigationExperimental

const {PropTypes} = React

class NavigationPager extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  static propTypes: {
    // selectedTab: PropTypes.string, // TODO change to oneOf(tabs)
    // switchTab: PropTypes.func.isRequired,
  }
  render() {
    return (
      <NavTransitioner
        {...this.props}
        render={this._render.bind(this)}
      />
    )
  }
  _render(transitionProps) {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {...transitionProps, scene}
      return (
        <Page
          {...sceneProps}
          key={scene.route.key+'_scene'}
          render={this.props.renderScene}
          />
      )
    })
    return (
      <View style={styles.navigator}>
        {scenes}
      </View>
    );
  }
}

class Page extends React.Component {
  render() {
    return (
      <View>
        {this.props.render(this.props)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  }
})

module.exports = NavigationPager
