import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import WheelPicker from '../../src/wheelPicker';

export default function App() {
    return (
        <View style={styles.container}>
            <WheelPicker wheelWidth={100} itemHeight={60} data={[1, 2, 3]} />
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
});
