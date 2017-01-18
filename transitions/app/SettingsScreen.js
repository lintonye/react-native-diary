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

const SettingsScreen = ({transition, duration, onTransitionChanged, onDurationChanged, onBack}) => (
    <View>
        <Toolbar title="Settings" 
            navIconName="arrow-back"
            onIconClicked={() => onBack()}
        />
        <View style={styles.container}>
            <Text>Transition</Text>
            <Picker selectedValue={transition}
                onValueChange={onTransitionChanged}>
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

const styles = StyleSheet.create({
    container: {
        margin: 15,
    }
})
export default SettingsScreen;