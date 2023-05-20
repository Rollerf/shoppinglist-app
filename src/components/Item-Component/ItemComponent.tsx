import React from 'react';
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
    toggleDelete: (item: Item) => void;
    handleQuantityDecrease: (item: Item) => void;
    handleQuantityIncrease: (item: Item) => void;
}

export default function ItemComponent(props: ItemComponentProps) {
    const deleteItemAction = () => {
        console.debug(new Date() + " deleteItemAction");
        props.toggleDelete(props.item);
    };

    return (
        <Swipeable onEnded={deleteItemAction}
            renderRightActions={ActionItemComponent}
            activeOffsetX={[-20, 20]}>
            <View style={styles.container}>
                <Text style={styles.Text}>{props.item.name}</Text>
                <QuantityComponent decreaseQuantity={props.handleQuantityDecrease}
                    increaseQuantity={props.handleQuantityIncrease}
                    item={props.item} />
            </View>
        </Swipeable>
    );
};
