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
} from 'react-native';

import SharedView from './SharedView';
import Touchable from './Touchable';

const { width: windowWidth } = Dimensions.get("window");

const PhotoDetail = (props) => {
    const { url, title, description, image } = props.photo;
    return (
        <ScrollView>
            <View>
                <Touchable onPress={() => props.onPhotoPressed(props.photo)}>
                    <View>
                        <SharedView name={`image-${url}`} containerRouteName='ROUTE_PHOTO_DETAIL'>
                            <Image source={image} style={styles.image} />
                        </SharedView>
                    </View>
                </Touchable>
                <SharedView name={`title-${url}`} containerRouteName='ROUTE_PHOTO_DETAIL'>
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