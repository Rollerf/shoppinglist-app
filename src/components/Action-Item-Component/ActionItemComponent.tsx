import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';
import Item from '../../models/Item';

interface ActionItemComponentProps {
    item: Item;
    toggleDelete: (item: Item) => void;
}

export default function ActionItemComponent(props: ActionItemComponentProps) {
    const deleteItemAction = () => {
        props.toggleDelete(props.item);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={deleteItemAction}>
                <Icon name="trash" size={40} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}