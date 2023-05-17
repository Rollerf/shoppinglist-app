import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';

export default function ActionItemComponent() {
    const deleteItem = () => {
        console.log(new Date() + ' delete item');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={deleteItem}>
                <Icon name="trash" size={40} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}