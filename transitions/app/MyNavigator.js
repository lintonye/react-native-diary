// @flow

import React, { Component } from 'react';
import {
    View,
    Text,
    NavigationExperimental,
    BackAndroid,
} from 'react-native';

import type {NavigationRoute } from 'react-native';

import PhotoGridScreen from './PhotoGridScreen';
import PhotoDetail from './PhotoDetail';
import SettingsScreen from './SettingsScreen';
import SharedElementTransitioner from './SharedElementTransitioner';
import MaterialSharedElementTransitioner from './MaterialSharedElementTransitioner';
import CrossFadeTransitioner from './CrossFadeTransitioner';
import AndroidDefaultTransitioner from './AndroidDefaultTransitioner';

const {
    CardStack,
    StateUtils,
} = NavigationExperimental;

class MyNavigator extends Component {
    state: {
        navigation: {
            routes: Array<NavigationRoute>
        },
        transition: 'cardStack' | 'sharedElement' | 'materialSharedElement' | 'crossFade' | 'androidDefault',
        duration: number,
    }
    constructor(props) {
        super(props);
        this.state = {
            navigation: {
                routes: [{ key: 'ROUTE_PHOTO_GRID' }],
                // routes: [{ key: 'ROUTE_PHOTO_DETAIL', photo:{url:'http://lorempixel.com/500/500/animals?71531'} }],
                index: 0,
            },
            transition: 'materialSharedElement',
            duration: 300,
        };
    }
    componentWillMount() {
        BackAndroid.addEventListener("hardwareBackPress", () => {
            if (this.state.navigation.routes.length > 1) {
                this.navigateBack();
                return true;
            } else return false;
        });
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress");
    }
    render() {
        const transitionMap = {
            cardStack: CardStack,
            sharedElement: SharedElementTransitioner,
            materialSharedElement: MaterialSharedElementTransitioner,
            crossFade: CrossFadeTransitioner,
            androidDefault: AndroidDefaultTransitioner,
        }
        const Transitioner = transitionMap[this.state.transition];
        return (
            <Transitioner
                direction="horizontal"
                renderScene={this.renderScene.bind(this)}
                navigationState={this.state.navigation}
                onNavigateBack={this.navigateBack.bind(this)}
                />
        )
    }
    navigateBack() {
        this.setState({ navigation: StateUtils.pop(this.state.navigation) })
    }
    navigate(key: string, payload?: Object) {
        this.setState({ navigation: StateUtils.push(this.state.navigation, { key, ...payload}) })
    }
    renderScene(sceneProps) {
        // console.log('scenes => ', sceneProps.scenes);
        const {route} = sceneProps.scene;
        const {key} = route;
        switch (key) {
            case 'ROUTE_PHOTO_GRID':
                return (<PhotoGridScreen 
                    transition={this.state.transition}
                    duration={this.state.duration}
                    onPhotoPressed={ photo => 
                        this.navigate('ROUTE_PHOTO_DETAIL', { photo })
                    }
                    onOpenSettings={ transition =>
                        this.navigate('ROUTE_SETTINGS')
                    }
                    />);
            case 'ROUTE_PHOTO_DETAIL':
                return (<PhotoDetail photo={route.photo} />);
            case 'ROUTE_SETTINGS':
                return (
                    <SettingsScreen
                        transition={this.state.transition}
                        duration={this.state.duration}
                        onTransitionChanged={ transition =>
                            this.setState({ transition })
                        }
                        onDurationChanged={ duration =>
                            this.setState({ duration })
                        }
                        onBack={this.navigateBack.bind(this)}
                    />
                );
            default:
                return <Text>Invalid route {key} </Text>
        }
    }
}

export default MyNavigator;