// @flow
import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
    Text,
    Easing,
    TouchableNativeFeedback,
} from 'react-native';

import SharedView from './SharedView';

const { width: windowWidth } = Dimensions.get("window");

const PhotoDetail = ({ photo: {url, title, description} }) => (
    <ScrollView>
        <View>
            <SharedView name={`image${url}`} containerRouteName='ROUTE_PHOTO_DETAIL'>
                <Image source={{ uri: url }} style={styles.image}/>
            </SharedView>
            <Text style={[styles.text, styles.title]}>{title}</Text>
            <Text style={[styles.text]}>{description}</Text>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    image: {
        width: windowWidth,
        height: windowWidth,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        margin: 15,
    }
})

export default PhotoDetail;