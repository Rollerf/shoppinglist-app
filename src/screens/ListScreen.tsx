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
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        console.debug('ListScreen: useEffect');
        const fetchData = async () => {
            try {
                const isLoggedIn = await isLogedIn();
                if (!isLoggedIn) {
                    console.debug('ListScreen: useEffect: isLoggedIn: false');
                    navigation.navigate('Login');

                    return;
                }
                
                console.debug('ListScreen: useEffect: isLoggedIn: true');
                const items = await ItemService.getItems();
                setItems(items);
            } catch (err) {
                console.error(err);
                navigation.navigate('Login');
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchData);

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    // -------------------- STYLES -------------------- //
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#5b73ec"
        },
        GestureHandler: {
        },
    });

    const handleAddButtonClick = (item: Item) => {
        let newItem: Item;
        newItem = items.filter((e) => e.name.toLowerCase() === item.name)[0];

        if (item.name !== "" && newItem === undefined) {
            console.log("Create item: " + item.name);
            newItem = new Item(item.name);
            ItemService.createItem(newItem).then(() => {
                addItem(items, newItem, setItems);
            }
            ).catch(err => console.log(err));

            return;
        }

        if (newItem.deleted) {
            console.log("Modify item: " + item.name);
            let newItems = items.filter((e) => e.name.toLowerCase() !== item.name);
            newItem.deleted = false;
            ItemService.modifyItem(newItem).then(() => {
                addItem(newItems, newItem, setItems);
            }
            ).catch(err => console.log(err));
        }
    }

    const toggleDelete = (item: Item) => {
        let updatedList: Item[] = items.map((value) => {
            if (value.name === item.name) {
                value.deleted = !value.deleted;
            }

            return value;
        });

        setItems(updatedList);
        ItemService.deleteItem(item);
    };

    const decreaseQuantity = (item: Item) => {
        let index = items.findIndex((value) => {
            return value.name === item.name;
        });

        let newItems = [...items];

        if (newItems[index].quantity > 0) {
            newItems[index].quantity--;
        }

        setItems(newItems);
        ItemService.modifyItem(newItems[index]);
    };

    const increaseQuantity = (item: Item) => {
        let index = items.findIndex((value) => {
            return value.name === item.name;
        });

        let newItems = [...items];

        newItems[index].quantity++;

        setItems(newItems);
        ItemService.modifyItem(newItems[index]);
    };

    // -------------------- RENDER -------------------- //
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <StatusBar style="auto" /> */}
            <AddItemComponent handleAddButtonClick={handleAddButtonClick} />
            <GestureHandlerRootView style={styles.GestureHandler}>
                {items && items.filter(item => !item.deleted).map((item) => (
                    <ItemComponent item={item} key={item.name}
                        handleQuantityIncrease={increaseQuantity}
                        handleQuantityDecrease={decreaseQuantity}
                        toggleDelete={toggleDelete} />
                ))}
            </GestureHandlerRootView>
        </ScrollView>
    );
};

function addItem(itemsState: Item[], newItem: Item, setItemsState: React.Dispatch<React.SetStateAction<Item[]>>) {
    let newItems = [...itemsState, newItem];
    newItems.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    setItemsState(newItems);
}
