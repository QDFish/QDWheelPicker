import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    type ViewStyle,
    type TextStyle,
} from 'react-native';

interface WheelPickerRowProps {
    text: string;
    itemHeight: number;
    rowStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const WheelPickerRow: React.FC<WheelPickerRowProps> = (props) => {
    return (
        <View
            style={[
                styles.row,
                props.rowStyle,
                { height: props.itemHeight, width: 'auto' },
            ]}
        >
            <Text style={[styles.rowTitle, props.textStyle]}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowTitle: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'normal',
    },
});

export default WheelPickerRow;
