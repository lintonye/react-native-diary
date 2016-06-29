'use strict';

const React = require('react')

const {
  NavigationExperimental: Navigation,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  BackAndroid,
  Animated,
  Easing,
} = require('react-native')

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
  Header: NavHeader,
  Transitioner: NavTransitioner,
} = Navigation

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <View>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
)

const Screen1 = ({goScreen2, goScreen3}) => (
  <View style={styles.sceneContainer}>
    <Text>This is Screen1</Text>
    <Button title="Go Screen2 &gt;" onPress={goScreen2} />
    <Button title="Go Screen3 &gt;" onPress={goScreen3} />
  </View>
)

const Screen2 = ({goBack, goScreen3}) => (
  <View style={styles.sceneContainer}>
    <Text>This is Screen2</Text>
    <Button title="Go Screen3 &gt;" onPress={goScreen3} />
    <Button title="&lt; Go Back" onPress={goBack} />
  </View>
)

const Screen3 = ({goBack}) => (
  <View style={styles.sceneContainer}>
    <Text>This is Screen3</Text>
    <Button title="&lt; Go Back" onPress={goBack} />
  </View>
)

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

class NavExample extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      navigation: {
        index: 0,
        routes: [
          {key: 'screen1'},
        ]
      }
    }
    this._renderScene = this._renderScene.bind(this)

    this._goScreen2 = this._navigate.bind(this, {type:'push', key:'screen2'})
    this._goScreen3 = this._navigate.bind(this, {type:'push', key:'screen3'})
    this._goBack = this._navigate.bind(this, {type:'pop'})
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.state.navigation.index > 0) {
          this._goBack()
          return true
        } else {
          return false
        }
      })
    }
  }
  render() {
    return (
      <NavTransitioner
        render={this._render.bind(this)}
        navigationState={this.state.navigation}
        style={styles.sceneContainer}
        configureTransition={this._configureTransition}
      />
    )
  }
  _configureTransition(): NavigationTransitionSpec {
    const easing: any = Easing.inOut(Easing.ease);
    return {
      duration: 200,
      easing,
    };
  }
  _render(transitionProps) {
    console.log(JSON.stringify(transitionProps, null, '  '));
    return transitionProps.scenes.map((scene) => this._renderScene({
      ...transitionProps,
      scene,
    }))
  }
  _renderScene(sceneProps) {
    // console.log(JSON.stringify(sceneProps, null, '  '));
    const sceneKey = sceneProps.scene.route.key
    let sceneView;
    switch (sceneKey) {
      case 'screen1':
        sceneView = (
          <Screen1 goScreen2={this._goScreen2}
            goScreen3={this._goScreen3}
            {...sceneProps} />
        )
        break
      case 'screen2':
        sceneView = (
          <Screen2 goBack={this._goBack}
            goScreen3={this._goScreen3}
            {...sceneProps} />
        )
        break
      case 'screen3':
        sceneView = (
          <Screen3 goBack={this._goBack}
            {...sceneProps} />
        )
        break
      default:
        sceneView = (
          <View style={styles.sceneContainer}>
            <Text>{`No such scene: ${scene}`}</Text>
          </View>
        )
    }
    return (
      <Animated.View
        style={[this._getAnimatedStyle(sceneProps)]}>
        {sceneView}
      </Animated.View>
    )
  }
  _navigate(action) {
    const newNavState = reduceNavState(this.state.navigation, action)
    if (newNavState !== this.state.navigation) {
      this.setState({
        navigation: newNavState,
      })
    }
  }
  _getAnimatedStyle(sceneProps): Object {
    const {
      layout,
      position,
      scene,
    } = sceneProps;

    const { index } = scene

    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange,
      outputRange: [width, 0, -10],
    });

    return {
      transform: [
        { translateX },
      ],
    };
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    padding: 20,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  }
})

module.exports = NavExample
