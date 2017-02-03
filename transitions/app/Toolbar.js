// @flow

import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const {ToolbarAndroid} = Icon;

const ToolbarIos = (props) => (
    <View {...props} style={{backgroundColor:'blue', paddingTop: 20}}>
        {
            (props.navigation.state
                ? (
                    <Button color="white" title="Back" onPress={() => props.navigation.goBack()}
                        />
                )
                : null)
        }
    </View>
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
