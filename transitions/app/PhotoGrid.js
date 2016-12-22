// @flow
import React, { Component } from 'react';
import {
    ListView,
    Image,
    View,
    Text,
    TouchableNativeFeedback,
    Dimensions,
    StyleSheet,
} from 'react-native';
import faker from 'faker';
import _ from 'lodash';

import SharedView from './SharedView';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const photos = Array(50).fill(0).map(_ => ({
    url: faker.image.animals(500, 500, true),
    title: faker.name.findName(),
    description: faker.lorem.paragraphs(4),
}));

const colCount = 3;

const { width: windowWidth } = Dimensions.get("window");
const margin = 2;
const photoWidth = (windowWidth - margin * colCount * 2) / colCount;

const photoRows = _.chunk(photos, colCount);

class PhotoGrid extends Component {
    render() {
        return (
            <ListView
                dataSource={ds.cloneWithRows(photoRows)}
                renderRow={this.renderRow.bind(this)}
                />);
    }
    renderRow(photos) {
        return (
            <View style={styles.row}>
                {photos.map(this.renderCell.bind(this))}
            </View>
        )
    }
    renderCell(photo) {
        const onPhotoPressed = this.props.onPhotoPressed;
        return (
            <TouchableNativeFeedback onPress={() => onPhotoPressed(photo)} key={photo.url}>
                <View style={styles.cell}>
                    <SharedView id={`image${photo.url}`}>
                        <Image source={{ uri: photo.url }} style={styles.image}/>
                    </SharedView>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    cell: {
        margin: 2,
    },
    image: {
        width: photoWidth,
        height: photoWidth,
    }
})

export default PhotoGrid;