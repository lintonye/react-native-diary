// @flow
import React, {Component} from 'react';
import {
    View,
    NavigationExperimental,
    StyleSheet,
    Animated,
} from 'react-native';

const {
    Transitioner,
} = NavigationExperimental;

class AndroidDefaultTransitioner extends Component {
    render() {
        return (
            <Transitioner
                configureTransition={this._configureTransition.bind(this)}
                render={this._render.bind(this)}
                navigationState={this.props.navigationState}
                style={this.props.style}
                />
        )
    }
    _configureTransition() {
        return {
            duration: 200,
            useNativeDriver: true,
        }
    }
    _render(props) {
        const scenes = props.scenes.map(scene => this._renderScene({...props, scene}));
        const lastScene = scenes[scenes.length - 1];
        return (
            <View style={styles.scenes}>
                {scenes}
            </View>
        )
    }
    _renderScene(props) {
        const { position, scene, progress } = props;
        const { index } = scene;
        const inputRange = [index-1, index, index+1];
        const opacity = position.interpolate({
            inputRange,
            outputRange: [ 0, 1, 1],
        });

        const translateY = position.interpolate({
            inputRange,
            outputRange: [150, 0, 0],
        })

        const style = {opacity, transform: [{translateY}]};
        
        return (
            <Animated.View key={props.scene.route.key} style={[styles.scene, style]}>
                {this.props.renderScene(props)}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    scenes: {
        flex: 1,
    },
    scene: {
        backgroundColor: '#E9E9EF',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

export default AndroidDefaultTransitioner;