import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Item from '../../models/Item';
import QuantityComponent from '../Quantity-Component/QuantityComponent';
import styles from './Styles';

interface ItemComponentProps {
    item: Item;
    // toggleDelete: (item: Item) => void;
    // handleQuantityDecrease: (item: Item) => void;
    // handleQuantityIncrease: (item: Item) => void;
}
//TODO: Continue editing styles to the component
export default function ItemComponent(props: ItemComponentProps) {
    // -------------------- RENDER -------------------- //
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>{props.item.name}</Text>
            <QuantityComponent />
        </View>
    );
};
