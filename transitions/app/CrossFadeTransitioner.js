// @flow
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Animated,
} from 'react-native';

import { CardStack } from 'react-navigation';
import type { NavigationSceneRendererProps } from 'react-navigation';

class CrossFadeTransitioner extends Component {
    render() {
        const transitionConfig = {
            screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
                const { position, scene, progress } = sceneProps;
                const { index } = scene;
                const inputRange = [index - 1, index, index + 1];
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                });

                return { opacity };
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

export default CrossFadeTransitioner;