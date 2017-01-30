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

const PhotoDetail = (props) => {
    const { photo } = props.navigation.state.params;
    const { url, title, description, image } = photo;
    const openMoreDetails = photo => props.navigation.navigate('PhotoMoreDetail', { photo });
    return (
        <ScrollView>
            <View>
                <TouchableNativeFeedback onPress={() => openMoreDetails(photo) }>
                    <View>
                        <SharedView name={`image-${url}`} containerRouteName='PhotoDetail'>
                            <Image source={image} style={styles.image} />
                        </SharedView>
                    </View>
                </TouchableNativeFeedback>
                <SharedView name={`title-${url}`} containerRouteName='PhotoDetail'>
                    <Text style={[styles.text, styles.title]}>{title}</Text>
                </SharedView>
                <Text style={[styles.text]}>{description}</Text>
            </View>
        </ScrollView>
    )
};

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