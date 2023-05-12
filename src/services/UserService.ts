import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';

export const storeUserData = async (user: User) => {
    try {
        const jsonValue = JSON.stringify(user);
        global.userName = user.userName;
        await AsyncStorage.setItem(user.userName, jsonValue);
    } catch (e) {
        console.log(e);
    }
}

export const getUserData = async (): Promise<User | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(global.userName);

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
    }
}
