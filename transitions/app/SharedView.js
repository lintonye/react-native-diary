// @flow

import React, {Component} from 'react';
import {
    View,
    UIManager,
    findNodeHandle,
} from 'react-native';

import NativeMethodsMixin from 'NativeMethodsMixin';

import SharedElementRepo from './SharedElementRepo';

class SharedView extends Component {
    render() {
        return (
            <View
                onLayout={this._onLayout.bind(this)}
                ref={c => this._comp = c}
                >
                {this.props.children}
            </View>
        )
    }
    _onLayout(event) {
        const { id, isOnDetail } = this.props;
        return new Promise((resolve, reject) => {
            UIManager.measureInWindow(
                findNodeHandle(this._comp),
                (x, y, width, height) => {
                    SharedElementRepo.put(id, !!isOnDetail, this.render(), {x, y, width, height});
                    resolve();
                }
            );
        });
    }
}

export default SharedView;