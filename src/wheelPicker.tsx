import React, { useRef } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    type ViewStyle,
    type TextStyle,
} from 'react-native';
import { type ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import WheelPickerRow, { type WheelPickerRowRefType } from './WheelPickerRow';

interface WheelPickerProps {
    wheelWidth: number;
    itemHeight: number;
    data: string[];
    visibleNum?: 1 | 2 | 3;
    selectIndex: number;
    onChange?: (index: number) => void;
    rowStyle?: ViewStyle;
    textStyle?: TextStyle;
}

// const AnimatedWheelPickerRow = Animated.createAnimatedComponent(WheelPickerRow)

const WheelPicker: React.FC<WheelPickerProps> = (props) => {
    const ref = useRef<WheelPickerRowRefType | null>(null);
    const _visibleNum = props.visibleNum ?? 2;
    const listRef = useRef<FlatList<string> | null>(null);
    const momentumBeginRef = useRef<boolean>(false);
    const visibleNum = _visibleNum <= 3 ? _visibleNum : 3;
    const listHeight = (visibleNum * 2 + 1) * props.itemHeight;

    let data = props.data.slice();
    let i = visibleNum;
    while (i--) {
        data.unshift('');
        data.push('');
    }

    let maxOffsetY = data.length * props.itemHeight - listHeight;
    maxOffsetY = maxOffsetY > 0 ? maxOffsetY : 0;

    const scrollEndDrag = (event: {
        nativeEvent: {
            contentOffset: { x: number; y: number };
        };
    }) => {
        console.log('end drag');
        const y = event.nativeEvent.contentOffset.y;
        if (y < 0 || y > maxOffsetY) {
            console.log('out range');
            return;
        }

        // the timing of momentunBegin even is later than scrollEndDrag even, thus delaying the drag event
        setTimeout(() => {
            if (momentumBeginRef.current) {
                return;
            }

            const idx = Math.round(y / props.itemHeight);
            listRef.current?.scrollToIndex({
                animated: true,
                index: idx,
            });
            setTimeout(() => {
                props.onChange && props.onChange(idx);
            }, 200);
        }, 100);
    };

    const scrollHandler = useAnimatedScrollHandler(
        (event: ReanimatedScrollEvent) => {
            'worklet';
            console.log(event.contentOffset.y);
        }
    );

    const momentumScrollEnd = (event: {
        nativeEvent: {
            contentOffset: { x: number; y: number };
        };
    }) => {
        if (!momentumBeginRef.current) {
            return;
        }

        momentumBeginRef.current = false;
        console.log('momentumScrollEnd');
        const y = event.nativeEvent.contentOffset.y;
        if (y < 0 || y > maxOffsetY) {
            console.log('out range');
            return;
        }
        const idx = Math.round(y / props.itemHeight);
        listRef.current?.scrollToIndex({
            animated: true,
            index: idx,
        });
        setTimeout(() => {
            props.onChange && props.onChange(idx);
        }, 200);
    };

    console.log('render');

    return (
        <View style={[styles.container, { width: props.wheelWidth }]}>
            <View
                style={[
                    styles.selector,
                    { width: props.wheelWidth, height: props.itemHeight },
                ]}
            />
            <Animated.FlatList
                ref={listRef}
                contentOffset={{
                    x: 0,
                    y: props.selectIndex * props.itemHeight,
                }}
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                style={[styles.list, { maxHeight: listHeight }]}
                data={data}
                scrollEventThrottle={1}
                onScrollEndDrag={scrollEndDrag}
                onMomentumScrollEnd={momentumScrollEnd}
                onMomentumScrollBegin={() => {
                    console.log('momentumScrollBegin');
                    momentumBeginRef.current = true;
                }}
                onScrollToIndexFailed={() => {}}
                onScroll={scrollHandler}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                console.log('ddd');
                                ref.current?.hh(2);
                            }}
                        >
                            <WheelPickerRow
                                ref={ref}
                                rowStyle={props.rowStyle}
                                textStyle={props.textStyle}
                                itemHeight={props.itemHeight}
                                text={item}
                                idx={index}
                                visibleNum={visibleNum}
                            />
                        </TouchableWithoutFeedback>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
    },

    selector: {
        borderWidth: 1,
        position: 'absolute',
    },

    list: {
        // backgroundColor: 'gray',
        backgroundColor: 'transparent',
    },
});

export default WheelPicker;
