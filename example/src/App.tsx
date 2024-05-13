import * as React from 'react';

import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import WheelPicker from '../../src/WheelPicker';

export default function App() {
    const [selectIndex, setSelectIndex] = React.useState<number>(0);

    return (
        <View style={styles.container}>
            <TouchableHighlight
                onPress={() => {
                    setSelectIndex((i) => (i + 1) % 12);
                }}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{'+'}</Text>
                </View>
            </TouchableHighlight>
            <WheelPicker
                visibleNum={2}
                textStyle={{ fontSize: 30 }}
                wheelWidth={100}
                itemHeight={40}
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
        backgroundColor: 'white',
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
