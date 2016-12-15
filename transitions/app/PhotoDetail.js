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
} from 'react-native';

const { width: windowWidth } = Dimensions.get("window");

const PhotoDetail = ({ photo: {url, title, description} }) => (
    <ScrollView>
        <View>
            <Image source={{ uri: url }} style={styles.image}/>
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