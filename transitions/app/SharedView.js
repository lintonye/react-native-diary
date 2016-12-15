// @flow

import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import NativeMethodsMixin from 'NativeMethodsMixin';

class SharedView extends Component {
    render() {
        return (
            <View
                onLayout={this._onLayout.bind(this)}
                >
                {this.props.children}
            </View>
        )
    }
    _onLayout(event) {
        // console.log(event.nativeEvent);
    }
}

export default SharedView;