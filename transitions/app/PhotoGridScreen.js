// @flow
import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import PhotoGrid from './PhotoGrid';
import Toolbar from './Toolbar';

class PhotoGridScreen extends Component {
    render() {
        const toolbarActions = [
            { title: 'Settings', show: 'always', iconName: 'settings', iconColor: 'white'},
            // { title: 'Change duration', show: 'always', iconName: 'access-time', iconColor: 'white'},
        ];
        const onActionSelected = index => {
            switch (index) {
                case 0: this.props.onOpenSettings(); break;
                default: alert(`Invalid action index: ${index}`);
            }
        }
        return (
            <View>
                <Toolbar title={`${this.props.transition}`}
                    actions={toolbarActions}
                    onActionSelected={onActionSelected}
                 />
                <PhotoGrid {...this.props} />
            </View>
        )
    }
}


export default PhotoGridScreen;