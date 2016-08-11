/**
 * @flow
 */

import React from 'react'
import {
  Animated,
  View,
  StyleSheet,
  NavigationExperimental,
} from 'react-native'

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
  Transitioner: NavTransitioner,
  Card: NavCard,
} = NavigationExperimental

const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavCard;

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
  _navigate(action) {
    const {index, routes} = this.props.navigationState
    const pageCount = routes.length
    const delta = action === 'back' ? -1 : 1
    const newIdx = Math.max(0, Math.min(pageCount-1, index+delta))
    this.props.navigatePage(newIdx)
  }
  _render(transitionProps) {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {...transitionProps, scene}
      return (
        <Page
          {...sceneProps}
          navigate={this._navigate.bind(this)}
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
    const style = [
      styles.scene,
      NavigationPagerStyleInterpolator.forHorizontal(this.props),
    ];
    const panHandlers = NavigationPagerPanResponder.forHorizontal({
      ...this.props,
      onNavigateBack: () => this.props.navigate('back'),
      onNavigateForward: () => this.props.navigate('forward'),
    })
    return (
      <Animated.View
        {...panHandlers}
        style={style}>
        <View>
          {this.props.render(this.props)}
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  scene: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
})

module.exports = NavigationPager
