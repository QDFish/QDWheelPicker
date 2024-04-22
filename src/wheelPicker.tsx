import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

interface WheelPickerProps {
    wheelWidth: number;
    itemHeight: number;
    data: number[];
    visibleNum?: 1 | 2 | 3;
}

const WheelPicker: React.FC<WheelPickerProps> = (props) => {
    const _visibleNum = props.visibleNum ?? 2;

    const visibleNum = _visibleNum <= 3 ? _visibleNum : 3;
    const listHeight = visibleNum * 2 + 1;

    return (
        <View style={[styles.container, { width: props.wheelWidth }]}>
            <FlatList
                style={[styles.list, { maxHeight: listHeight }]}
                pagingEnabled={true}
                data={props.data}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={[styles.row, { height: props.itemHeight }]}
                        >
                            <Text style={styles.rowTitle}>{item}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
    },

    list: {
        // backgroundColor: 'gray',
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    rowTitle: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'normal',
    },
});

export default WheelPicker;
