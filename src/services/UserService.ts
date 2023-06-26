import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';

const userLoged = "userLoged";

export const storeUserData = async (user: User) => {
    console.debug("storeUserData");
    try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem(userLoged, jsonValue);
    } catch (e) {
        console.error("storeUserData: " + e);
    }
}

export const getUserData = async (): Promise<User | undefined> => {
    try {
        console.debug("getUserData");

        const jsonValue = await AsyncStorage.getItem(userLoged);

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("getUserData " + e);
    }
}

export const deleteUserData = async () => {
    try {
        console.debug("deleteUserData");

        await AsyncStorage.removeItem(userLoged);
    } catch (e) {
        console.error("deleteUserData: " + e);
    }
}