// @flow

import React, { Component } from 'react';
import {
    View,
    Text,
    BackAndroid,
} from 'react-native';

import type {NavigationRoute } from 'react-native';

import PhotoGridScreen from './PhotoGridScreen';
import PhotoDetail from './PhotoDetail';
import PhotoMoreDetail from './PhotoMoreDetail';
import SettingsScreen from './SettingsScreen';
import MaterialSharedElementTransitioner from './MaterialSharedElementTransitioner';
import CrossFadeTransitioner from './CrossFadeTransitioner';
import AndroidDefaultTransitioner from './AndroidDefaultTransitioner';
import MultiTransitioner from './MultiTransitioner';

import { createNavigationContainer, createNavigator, StackRouter, CardStack } from 'react-navigation';

type TransitionName = 'cardStack' | 'materialSharedElement' | 'crossFade' | 'androidDefault' | 'multiTransitioner';

class TransitionerSwitcher extends Component {
    state: {
        transition: TransitionName,
        duration: number,
    }
    constructor(props) {
        super(props);
        this.state = {
            transition: 'multiTransitioner',
            duration: 300,
        };
    }
    render() {
        const transitionMap = {
            cardStack: CardStack,
            materialSharedElement: MaterialSharedElementTransitioner,
            crossFade: CrossFadeTransitioner,
            androidDefault: AndroidDefaultTransitioner,
            multiTransitioner: MultiTransitioner
        }
        const Transitioner = transitionMap[this.state.transition];
        return (
            <Transitioner {...this.props} />
        );
    }
    // For simplicity, we use context to pass these functions to PhotoGridScreen and SettingsScreen
    // In real apps, we can use Redux to manage the state.
    static childContextTypes = {
        setActiveTransition: React.PropTypes.func,
        getActiveTransition: React.PropTypes.func,
    }
    getChildContext() {
        const self = this;
        return {
            setActiveTransition(transition:TransitionName) {
                self.setState({ transition });
            },
            getActiveTransition():TransitionName {
                return self.state.transition;
            }
        }
    }
}

const router = StackRouter({
    PhotoGrid: {
        screen: PhotoGridScreen,
    },
    PhotoDetail: {
        screen: PhotoDetail,
    },
    PhotoMoreDetail: {
        screen: PhotoMoreDetail,
    },
    Settings: {
        screen: SettingsScreen,
    }
});

const MyNavigator = createNavigationContainer(createNavigator(router)(TransitionerSwitcher));

export default MyNavigator;