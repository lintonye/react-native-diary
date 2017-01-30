// @flow
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Animated,
} from 'react-native';

import { CardStack } from 'react-navigation';
import type { NavigationSceneRendererProps } from 'react-navigation';

class AndroidDefaultTransitioner extends Component {
    render() {
        const transitionConfig = {
            screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
                const { position, scene, progress } = sceneProps;
                const { index } = scene;
                const opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 0.999, index + 1],
                    outputRange: [0, 1, 1, 0],
                });

                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [150, 0, 0],
                })

                return { opacity, transform: [{ translateY }] };
            }
        }
        return (
            <CardStack mode="card"
                navigation={this.props.navigation}
                router={this.props.router}
                transitionConfig={transitionConfig}
                headerMode="none"
                />
        )
    }
}


export default AndroidDefaultTransitioner;