// @flow
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Text,
    Dimensions,
    UIManager,
    InteractionManager,
} from 'react-native';

import { Transitioner, addNavigationHelpers } from 'react-navigation';

import type {NavigationTransitionProps } from 'NavigationTypeDefinition';

import SharedItems from './SharedItems';

import type { Metrics, SharedItem, UpdateRequest } from './SharedItems';

type State = {
    transitionInProgress: boolean,
}

function cloneScenes(scenes: Array<React.Element<*>>) {
    return scenes.map(scene => {
        return traverseClone(scene);
    });
}

function deepClone(e: React.Element<*>, children: Array<React.Element<*>>) {
    e.type && console.log(e.type.displayName || e.type.name);
    const props = { ...e.props, children };
    const context = {
        getActiveTransition() { return 'nothing'; },
        setActiveTransition() { },
    }
    let element;
    const isCreateClass = e.type.name === 'Constructor' && typeof e.type === 'function';
    const isEs6Class = typeof e.type.prototype.render === 'function';
    if (isEs6Class || isCreateClass) {
        const instance = new e.type(props, context);
        element = instance.render();
    } else {
        element = e.type(props, context);
    }
    return traverseClone(element);
}

function traverseClone(element: React.Element<*>) {
    const shouldDeepClone = e => typeof e.type === 'function' && !['ToolbarAndroid', 'ListView'].includes(e.type.displayName);
    if (shouldDeepClone(element)) {
        const children = React.Children.map(element.props.children, traverseClone);
        return deepClone(element, children);
    } else {
        console.log('React.cloneElement', element.type && element.type.displayName)
        return React.cloneElement(element);
    }
}

class MultiTransitioner extends Component {
    state: State;
    constructor(props) {
        super(props);
        this.state = {
            transitionInProgress: false,
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Transitioner
                    configureTransition={this._configureTransition.bind(this)}
                    render={this._render.bind(this)}
                    navigationState={this.props.navigation.state}
                    onTransitionStart={this._onTransitionStart.bind(this)}
                    onTransitionEnd={this._onTransitionEnd.bind(this)}
                    style={this.props.style}
                />
            </View>
        );
    }
    _onTransitionStart() {
        // this.setState({ transitionInProgress: true });
    }
    _onTransitionEnd() {
        // this.setState({ transitionInProgress: false });
    }
    _configureTransition() {
        return {
            duration: 300,
            // useNativeDriver: false,
        }
    }
    _render(props: NavigationTransitionProps, prevProps: NavigationTransitionProps) {
        const scenes = props.scenes.map(scene => this._renderScene(scene));
        const overlay = this._renderOverlay(props, prevProps, scenes);
        const animatedScenes = props.scenes.map(scene => this._animateScene({ ...props, scene }));
        return (
            <View style={styles.scenes}>
                {animatedScenes}
                {overlay}
            </View>
        )
    }
    _renderOverlay(props: NavigationTransitionProps, prevProps: NavigationTransitionProps, scenes: Array<React.Element<*>>) {
        const fromRoute = prevProps ? prevProps.scene.route.routeName : 'unknownRoute';
        const toRoute = props.scene.route.routeName;
        const then = new Date();
        const clonedScenes = cloneScenes(scenes);
        console.log(`===> clonedScenes: ${new Date() - then} ms`);
        const containerStyle = this._getOverlayContainerStyle(props.progress);
        return (
            <Animated.View style={[styles.overlay, containerStyle]}>
                {clonedScenes}
            </Animated.View>
        );
    }
    _renderScene(scene) {
        const Scene = this.props.router.getComponentForRouteName(scene.route.routeName);
        const navigation = this._getChildNavigation(scene);
        return <Scene navigation={navigation} />;
    }

    _animateScene(transitionSceneProps) {
        const { position, scene, progress } = transitionSceneProps;
        const { index } = scene;
        const inputRange = [index - 1, index - 0.01, index, index + 0.01, index + 1];
        const opacity = position.interpolate({
            inputRange,
            outputRange: [0, 0, 1, 0, 0],
        });
        const style = { opacity };

        return (
            <Animated.View key={transitionSceneProps.scene.route.key} style={[style, styles.scene]}>
                {this._renderScene(scene)}
            </Animated.View>
        );
    }

    _getOverlayContainerStyle(progress) {
        const left = progress.interpolate({
            inputRange: [0, 0.999999, 1],
            outputRange: [0, 0, 100000], // move it off screen after transition is done
        });
        return {
            left,
            top: 200,
        };
    }

    _getChildNavigation = (scene: NavigationScene): NavigationScreenProp<NavigationRoute, NavigationAction> => {
        if (!this._childNavigationProps) this._childNavigationProps = {};
        let navigation = this._childNavigationProps[scene.key];
        if (!navigation || navigation.state !== scene.route) {
            navigation = this._childNavigationProps[scene.key] = addNavigationHelpers({
                ...this.props.navigation,
                state: scene.route,
            });
        }
        return navigation;
    }

}

const styles = StyleSheet.create({
    scenes: {
        flex: 1,
    },
    scene: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 100000, // invisible by default
        right: 0,
        bottom: 0,
    }
});

export default MultiTransitioner;