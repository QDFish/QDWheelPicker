import React, { useImperativeHandle } from 'react';
import {
    Text,
    StyleSheet,
    type ViewStyle,
    type TextStyle,
    Animated,
} from 'react-native';

import { type ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

interface WheelPickerRowProps {
    idx: number;
    text: string;
    itemHeight: number;
    rowStyle?: ViewStyle;
    textStyle?: TextStyle;
    visibleNum: 1 | 2 | 3;
}

export type WheelPickerRowRefType = {
    scrollEvent: (event: ReanimatedScrollEvent) => void;
    hh: (n: number) => void;
};

const WheelPickerRow = React.forwardRef<
    WheelPickerRowRefType,
    WheelPickerRowProps
>((props, ref) => {
    // const step = 1;
    // const visibleNum = (props.visibleNum + 1) * step;
    // const itemHeight = props.itemHeight / step;
    // const degEach = 90;
    // const radEach = (degEach / 180) * 3.14;
    // const _idx = (props.idx - props.visibleNum) * step;

    useImperativeHandle(ref, () => {
        return {
            scrollEvent: (event: ReanimatedScrollEvent) => {
                console.log(event.contentOffset.y);
            },
            hh: (n: number) => {
                console.log(n);
            },
        };
    });

    // props.scrollY.addListener((state: { value: number }) => {
    //     console.log(`qdfish ${state.value}`);
    // });

    // const rotateFunc = (idx: number) => {
    //     const i = (1 / visibleNum) * idx;
    //     return i;
    // };

    // const rotateX = props.scrollY.interpolate({
    //     inputRange: (() => {
    //         const initScrollY = _idx * itemHeight;
    //         const range: number[] = [initScrollY];
    //         for (let i = 1; i <= visibleNum; i++) {
    //             range.unshift(initScrollY - itemHeight * i);
    //             range.push(initScrollY + itemHeight * i);
    //         }

    //         return range;
    //     })(),
    //     outputRange: (() => {
    //         const range: string[] = [`0rad`];
    //         for (let i = 1; i <= visibleNum; i++) {
    //             const rad = rotateFunc(i) * radEach;
    //             range.unshift(`${-rad}rad`);
    //             range.push(`${rad}rad`);
    //         }
    //         return range;
    //     })(),
    // });

    // const inputRange = (() => {
    //     const initScrollY = _idx * itemHeight;
    //     const range: number[] = [initScrollY];
    //     const i = visibleNum;
    //     range.unshift(initScrollY - itemHeight * i);
    //     range.push(initScrollY + itemHeight * i);

    //     return range;
    // })();

    // const outputRange = (() => {
    //     const range: number[] = [0];
    //     const i = visibleNum;
    //     let y = (itemHeight / 2) * (1 - Math.sin(Math.PI / 2 - rotateFunc(i) * radEach)); // prettier-ignore
    //     for (let j = 1; j < i; j++) {
    //         y = y + itemHeight * (1 - Math.sin(Math.PI / 2 - rotateFunc(j) * radEach)); // prettier-ignore
    //     }
    //     range.unshift(-y);
    //     range.push(y);

    //     return range;
    // })();

    // const translateY = props.scrollY.interpolate({
    //     inputRange: inputRange,
    //     outputRange: outputRange,
    //     extrapolate: 'clamp',
    //     easing: (t) => {
    //         if (_idx == 0) {
    //             console.log(t);
    //         }

    //         return t;
    //     },
    // });

    // const opacity = props.scrollY.interpolate({
    //     inputRange: (() => {
    //         const initScrollY = _idx * itemHeight;
    //         const range: number[] = [initScrollY];
    //         for (let i = 1; i <= visibleNum; i++) {
    //             range.unshift(initScrollY - itemHeight * i);
    //             range.push(initScrollY + itemHeight * i);
    //         }

    //         return range;
    //     })(),
    //     outputRange: (() => {
    //         const range = [1];
    //         for (let x = 1; x <= visibleNum; x++) {
    //             const y = Math.pow(1 / 2, x);
    //             range.unshift(y);
    //             range.push(y);
    //         }
    //         return range;
    //     })(),
    // });

    // if (_idx == 0) {
    //     console.log(inputRange);
    //     console.log(outputRange);
    // }

    return (
        <Animated.View
            style={[
                styles.row,
                props.rowStyle,
                { height: props.itemHeight, width: 'auto' },
            ]}
        >
            <Text style={[styles.rowTitle, props.textStyle]}>{props.text}</Text>
        </Animated.View>
    );
});

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
