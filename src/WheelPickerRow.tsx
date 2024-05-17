import React from 'react';
import {
    Text,
    StyleSheet,
    type ViewStyle,
    type TextStyle,
} from 'react-native';

import Animated , { useDerivedValue, type SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface WheelPickerRowProps {
    idx: number;
    text: string;
    itemHeight: number;
    rowStyle?: ViewStyle;
    textStyle?: TextStyle;
    visibleNum: 1 | 2 | 3;
    scrollY: SharedValue<number>
}

const WheelPickerRow: React.FC<WheelPickerRowProps> = (props) => {
    const visibleNum = props.visibleNum + 2
    const itemHeight = props.itemHeight
    const deg = 90;
    const rad = (deg / 180) * 3.14;
    const _idx = props.idx - props.visibleNum;

    const initScrollY = _idx * itemHeight
    const upperScrollY = initScrollY - visibleNum * itemHeight
    const lowerScrollY = initScrollY + visibleNum * itemHeight
    const a = rad / (visibleNum * itemHeight)
    const b = -rad - upperScrollY * a

    const rotateX = useDerivedValue(() => {
        if (props.scrollY.value >= upperScrollY && props.scrollY.value <= lowerScrollY) {
            return `${a * props.scrollY.value + b}rad`
        }
        return '0rad'
    })

    const radEach = rad / visibleNum


    const animatedStyles = useAnimatedStyle(() => {
        let x = Number(rotateX.value.replace('rad', ''))
        let absX = Math.abs(x)

        let y = 0
        let opacity = 1
        if (x >= -rad && x <= rad) {
            const position = Math.floor(absX / radEach)

            y = (itemHeight / 2) * (1 - Math.sin(Math.PI / 2 - absX)); // prettier-ignore
            for (let j = 1; j <= position; j++) {
                absX = absX - radEach
                y = y + itemHeight * (1 - Math.sin(Math.PI / 2 - absX)); // prettier-ignore
            }

            opacity = Math.pow(1 / 4, Math.abs(x))
            if (_idx == 7) {
                console.log('xx' + Math.abs(x))
            }
            y = x > 0 ? y : -y
        }


        return {
            transform: [{translateY: y}, {rotateX: rotateX.value}], opacity
        }
    })

    return (
        <Animated.View
            style={[
                styles.row,
                props.rowStyle,
                { height: props.itemHeight, width: 'auto' },
                animatedStyles
            ]}
        >
            <Text style={[styles.rowTitle, props.textStyle]}>{props.text}</Text>
        </Animated.View>
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

export default React.memo(WheelPickerRow);
