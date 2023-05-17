import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';

const AddItemComponent = () => {
    const [inputValue, setInputValue] = useState('');

    const handleButtonPress = () => {
        // Perform action with the input value
        console.log('Input value:', inputValue);
        // You can replace the above line with your desired action, like sending the input value to an API

        // Clear the input value after the action
        setInputValue('');
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

export default AddItemComponent;
