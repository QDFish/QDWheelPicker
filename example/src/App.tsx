import * as React from 'react';

import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import WheelPicker from '../../src/wheelPicker';

export default function App() {
    const [selectIndex, setSelectIndex] = React.useState<number>(2);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    setSelectIndex((i) => (i + 1) % 12);
                }}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{'+'}</Text>
                </View>
            </TouchableWithoutFeedback>
            <WheelPicker
                wheelWidth={100}
                itemHeight={60}
                data={[
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                ]}
                selectIndex={selectIndex}
                onChange={(idx) => {
                    setSelectIndex(idx);
                    console.log(`idx ${idx}`);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },

    button: {
        backgroundColor: 'green',
        width: 100,
        height: 30,
    },

    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'normal',
    },
});
