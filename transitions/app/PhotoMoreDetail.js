// @flow
import React, { Component } from 'react';
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

const PhotoMoreDetail = ({ photo: {url, title, description, image} }) => (
    <ScrollView>
        <View>
            <View style={styles.container}>
                <SharedView name={`title-${url}`} containerRouteName='ROUTE_PHOTO_MORE_DETAIL'>
                    <Text style={[styles.text, styles.title]}>{title}</Text>
                </SharedView>
                <SharedView name={`image-${url}`} containerRouteName='ROUTE_PHOTO_MORE_DETAIL'>
                    <Image source={image} style={styles.image} />
                </SharedView>
            </View>
            <Text style={[styles.text]}>{description}</Text>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        margin: 15,
    },
    container: {
        flexDirection: 'row',
    }
})

export default PhotoMoreDetail;