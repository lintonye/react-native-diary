// @flow

import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const {ToolbarAndroid} = Icon;

// Don't show toolbar on iOS for now
const ToolbarIos = (props) => (
    <View {...props} />
)

const Toolbar = (props) => {
    const Comp = (Platform.OS === 'android'
        ? ToolbarAndroid
        : ToolbarIos);
    return (
        <Comp
            titleColor="white"
            {...props}
            style={[styles.toolbar, props.style]} />
    )
};

const styles = StyleSheet.create({
    toolbar: {
        height: 56,
        backgroundColor: '#651FFF',
        elevation: 5,
    }
});

export default Toolbar;
