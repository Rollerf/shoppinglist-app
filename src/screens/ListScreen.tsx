import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';

import ItemComponent from '../components/Item-Component/ItemComponent';
import Item from '../models/Item';
import AddItemComponent from '../components/AddItem-Component/AddItemComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { isLogedIn } from '../services/AuthService';
import ItemService from '../services/ItemService';

export default function ListScreen({ navigation }: any) {
    const [items, setItemsState] = useState<Item[]>([]);

    useEffect(() => {
        console.debug('ListScreen: useEffect');
        isLogedIn().then((isLogedIn) => {
            if (!isLogedIn) {
                console.debug('ListScreen: useEffect: isLogedIn: false');
                navigation.navigate('Login');
            }
        });

        ItemService.getItems().then((items) => {
            console.debug('ListScreen: useEffect: getItem');
            setItemsState(items);
        }).catch((response) => {
            if (!response)
                console.error("getItems: " + response.statusText);
        });
    }, []);

    // -------------------- ACTIONS -------------------- //
    const onPressLogin = () => {
        console.debug('ListScreen: onPressLogin');

    };

    // -------------------- STYLES -------------------- //
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#5b73ec"
        },
        GestureHandler: {
        },
    });

    // -------------------- RENDER -------------------- //
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <StatusBar style="auto" /> */}
            <AddItemComponent />
            <GestureHandlerRootView style={styles.GestureHandler}>
                {items.map((item) => (
                    <ItemComponent item={item} key={item.name}></ItemComponent>
                ))}
            </GestureHandlerRootView>
        </ScrollView>
    );
};
