'use strict';

const React = require('react')

const {
  NavigationExperimental: Navigation,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} = require('react-native')

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
} = Navigation

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <View>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
)

const Screen1 = ({goScreen2}) => (
  <View style={styles.sceneContainer}>
    <Text>This is Screen1</Text>
    <Button title="Go Screen2 &gt;" onPress={goScreen2} />
  </View>
)

const Screen2 = ({goBack}) => (
  <View style={styles.sceneContainer}>
    <Text>This is Screen2</Text>
    <Button title="&lt; Go Back" onPress={goBack} />
  </View>
)

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
    this._navigate = this._navigate.bind(this)
  }
  render() {
    return (
      <NavCardStack
        renderScene={this._renderScene}
        navigationState={this.state.navigation}
        onNavigate={this._navigate}
      />
    )
  }
  _renderScene(sceneProps) {
    console.log(JSON.stringify(sceneProps));
    const scene = sceneProps.scene.route.key
    switch (scene) {
      case 'screen1':
        return (
          <Screen1 goScreen2={this._navigate.bind(this, {type:'push', key:'screen2'})}
            {...sceneProps} />
        )
      case 'screen2':
        return (
          <Screen2 goBack={this._navigate.bind(this, {type:'pop'})}
            {...sceneProps} />
        )
      default:
        return (
          <View style={styles.sceneContainer}>
            <Text>{`No such scene: ${scene}`}</Text>
          </View>
        )
    }
  }
  _navigate(action) {
    const {type, key} = action;
    let navState = this.state.navigation
    let newNavState = navState
    switch (type) {
      case 'push':
        const route = {key}
        newNavState = NavStateUtils.push(navState, route)
        break;
      case 'pop':
        newNavState = NavStateUtils.pop(navState)
        break
      default:
        break
    }
    this.setState({
      navigation: newNavState,
    })
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
