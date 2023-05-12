import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import { StatusBar } from "expo-status-bar";
import ItemComponent from '../components/Item-Component/ItemComponent';
import Item from '../models/Item';

export default function ListScreen({ navigation }: any) {
    // -------------------- ACTIONS -------------------- //
    const onPressLogin = () => {
        console.debug('ListScreen: onPressLogin');

    };

    // -------------------- STYLES -------------------- //
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            // flex: 1,
            alignItems: "flex-end",
        }
    });

    // Generate the items
    const items:Item[] = [];
    for (let i = 1; i <= 20; i++) {
        items.push(new Item("Item" + i));
    }


    // -------------------- RENDER -------------------- //
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar style="auto" />
            <ItemComponent item={new Item("Item1 nombre muy largo a ver que hace en caso de que se alarguen")}></ItemComponent>
            {items.map((item, index) => (
                // Use the 'eval' function to dynamically execute the generated component
                <ItemComponent item={item} key={index}></ItemComponent>
            ))}
            {/* <TouchableOpacity style={styles.loginBtn} onPress={onPressLogin}>
                <Text>LOGIN</Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
};
