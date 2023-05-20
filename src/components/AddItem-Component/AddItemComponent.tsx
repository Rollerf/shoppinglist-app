import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';
import Item from '../../models/Item';

interface AddItemComponentProps {
    handleAddButtonClick: (item: Item) => void;
}

export default function AddItemComponent(props: AddItemComponentProps) {
    const [inputValue, setInputValue] = useState('');

    const handleButtonPress = () => {
        let inputName = inputValue.trim().toLowerCase();
        let newItem: Item;

        setInputValue("");

        if (inputName === "") {
            return;
        }

        newItem = new Item(inputName, 1, false);
        props.handleAddButtonClick(newItem);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Enter text..."
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleButtonPress} disabled={!inputValue}>
                <Ionicons name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};
