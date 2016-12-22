// @flow
import React, {Component} from 'react';
import {
    View,
    StatusBar,
} from 'react-native';

import MyNavigator from './MyNavigator';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" backgroundColor="#6200EA"/>
                <MyNavigator />
            </View>
            );
    }
}

export default App;