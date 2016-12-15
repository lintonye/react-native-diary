// @flow

import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const {ToolbarAndroid} = Icon;

const Toolbar = (props) => (
    <ToolbarAndroid  
        titleColor="white"
        {...props}
        style={[styles.toolbar, props.style]} />
);

const styles = StyleSheet.create({
    toolbar: {
        height: 56,
        backgroundColor: '#651FFF',
        elevation: 5,
    }
});

export default Toolbar;
