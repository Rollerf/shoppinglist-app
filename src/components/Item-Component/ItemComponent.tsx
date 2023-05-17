import React, { useState } from 'react';
import {
    View,
    Text
} from 'react-native';
import Item from '../../models/Item';
import QuantityComponent from '../Quantity-Component/QuantityComponent';
import styles from './Styles';
import { Swipeable } from 'react-native-gesture-handler';
import ActionItemComponent from '../Action-Item-Component/ActionItemComponent';

interface ItemComponentProps {
    item: Item;
    // toggleDelete: (item: Item) => void;
    // handleQuantityDecrease: (item: Item) => void;
    // handleQuantityIncrease: (item: Item) => void;
}

export default function ItemComponent(props: ItemComponentProps) {
    const endAction = () => {
        console.log(new Date() + ' endAction');
    };
    // -------------------- RENDER -------------------- //
    return (
        <Swipeable onEnded={endAction} renderRightActions={ActionItemComponent}>
            <View style={styles.container}>
                <Text style={styles.Text}>{props.item.name}</Text>
                <QuantityComponent />
            </View>
        </Swipeable>
    );
};
