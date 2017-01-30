// @flow
import React from 'react';

import {
    View,
    Picker,
    StyleSheet,
    Slider,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Toolbar from './Toolbar';

const SettingsScreen = ({navigation}, {getActiveTransition, setActiveTransition}) => (
    <View>
        <Toolbar title="Settings"
            navIconName="arrow-back"
            onIconClicked={() => navigation.goBack()}
            />
        <View style={styles.container}>
            <Text>Transition</Text>
            <Picker selectedValue={getActiveTransition()}
                onValueChange={v => setActiveTransition(v)}>
                <Picker.Item label="cardStack" value="cardStack" />
                <Picker.Item label="crossFade" value="crossFade" />
                <Picker.Item label="androidDefault" value="androidDefault" />
                <Picker.Item label="materialSharedElement" value="materialSharedElement" />
            </Picker>
            {
                // <Text>Duration: {duration} ms</Text>
                // <Slider value={duration} 
                //     minimumValue={100} 
                //     maximumValue={3000}
                //     step={100}
                //     onValueChange={onDurationChanged} />
            }
        </View>
    </View>
);

SettingsScreen.contextTypes = {
    setActiveTransition: React.PropTypes.func,
    getActiveTransition: React.PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
    }
})
export default SettingsScreen;