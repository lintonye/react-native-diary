// @flow
import React, { Component } from 'react';
import {
    View,
    NavigationExperimental,
    StyleSheet,
    Animated,
    Text,
} from 'react-native';

import type {NavigationTransitionProps} from 'NavigationTypeDefinition';

import SharedElementRepo from './SharedElementRepo';

const {
    Transitioner,
} = NavigationExperimental;

class MaterialSharedElementTransitioner extends Component {
    render() {
        return (
            <Transitioner
                configureTransition={this._configureTransition.bind(this)}
                render={this._render.bind(this)}
                navigationState={this.props.navigationState}
                style={this.props.style}
                />
        );
    }
    _configureTransition() {
        return {
            duration: 3000,
            useNativeDriver: false,
        }
    }
    _render(props: NavigationTransitionProps) {
        const scenes = props.scenes.map(scene => this._renderScene({ ...props, scene }));
        const overlay = this._renderOverlay(props);
        return (
            <View style={styles.scenes}>
                { scenes }
                { overlay }
            </View>
        )
    }
    _getOverlayContainerStyle(progress) {
        const left = progress.interpolate({
            inputRange: [0, 0.999999, 1],
            outputRange: [0, 0, 100000], // move it off screen after transition is done
        });
        return {
            left,
        };
    }
    _getSharedElementStyle(props: NavigationTransitionProps, onList, onDetail) {
        const { position, navigationState: {index} } = props;
        const detailOverListScaleX = onDetail.scaleRelativeTo(onList).x;
        const detailOverListScaleY = onDetail.scaleRelativeTo(onList).y;
        const minIdx = Math.min(index, position._value);
        const maxIdx = Math.max(index, position._value);
        const inputRange = [minIdx, maxIdx];
        const scaleX = position.interpolate({
            inputRange,
            outputRange: [1, detailOverListScaleX],
        });
        const scaleY = position.interpolate({
            inputRange,
            outputRange: [1, detailOverListScaleY],
        });
        const width = onList.metrics.width;
        const height = onList.metrics.height;
        const left = position.interpolate({
            inputRange,
            outputRange: [onList.metrics.x, onDetail.metrics.x + width /2 * (detailOverListScaleX - 1)],
        });
        const top = position.interpolate({
            inputRange,
            outputRange: [onList.metrics.y, onDetail.metrics.y + height /2 * (detailOverListScaleY - 1)],
        });
        return {
            width,
            height,
            position: 'absolute',
            left,
            top,
            right: null,
            bottom: null,
            transform: [ 
                {scaleX}, 
                {scaleY},
            ],
        };
    }
    _renderOverlay(props: NavigationTransitionProps) {
        const pairs = SharedElementRepo.getCompletePairs();
        const sharedElements = pairs.map((pair, idx) => {
            const {onList, onDetail} = pair;
            const animatedStyle = this._getSharedElementStyle(props, onList, onDetail);
            const element = onList.element; // TODO perhaps need to clone onDetail.element when coming back?
            const cloned = React.cloneElement(element, {
                onLayout: null,
                ref: null,
            });
            return (
                <Animated.View style={[animatedStyle]} key={idx}>
                    { cloned }
                </Animated.View>
            );
        });

        const containerStyle = this._getOverlayContainerStyle(props.progress);
        return (
            <Animated.View style={[styles.overlay, this.props.style, containerStyle]}>
                { sharedElements }
            </Animated.View>
        );
    }
    _renderDarkeningOverlay(progress, position, sceneIndex: number) {
        const backgroundColor = position.interpolate({
            inputRange: [sceneIndex - 1, sceneIndex, sceneIndex+0.2, sceneIndex + 1],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.5)'],
        });
        const animatedStyle = { zIndex: 100, backgroundColor, ...this._getOverlayContainerStyle(progress) };
        return <Animated.View style={[ styles.overlay, animatedStyle ]} />;
    }
    _renderScene(props) {
        const { position, scene, progress } = props;
        const { index } = scene;
        const inputRange = [index - 1, index - 0.01, index, index + 0.99, index + 1];
        const opacity = position.interpolate({
            inputRange,
            outputRange: [0, 0, 1, 1, 0],
        });
        const style = { opacity };

        // The extra view and zIndex below is to make sure the overlay covers toolbar
        return (
            <Animated.View key={props.scene.route.key} style={[style, styles.scene]}>
                <View style={{zIndex: 1}}>
                    {this.props.renderScene(props)}
                </View>
                {this._renderDarkeningOverlay(progress, position, index)}
            </Animated.View>
        )
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

export default MaterialSharedElementTransitioner;