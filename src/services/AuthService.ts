import { CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { CognitoPool } from '../config/CognitoPool';
import { getUserData, storeUserData } from './UserService';


export const isLogedIn = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();

        return keys.length > 0;
    } catch (e) {
        console.error(e);
    }
}

export const isValidToken = async () => {
    try {
        const user = await getUserData();
        if (user) {
            const { exp } = jwtDecode(user.accessToken) as {
                exp: number;
            };

            const now = new Date();
            const tokenExpiration = new Date(exp * 1000);

            return now < tokenExpiration;
        }
        return false;
    } catch (e) {
        console.error(e);
    }
}

export const refreshToken = async () => {
    const userName = global.userName;

    if (await isValidToken()) {
        return;
    }

    try {
        const user = new CognitoUser({
            Username: userName,
            Pool: CognitoPool,
        });

        const userData = await getUserData();
        const token = userData?.refreshToken != null ? userData.refreshToken : '';
        const refreshToken = new CognitoRefreshToken({ RefreshToken: token });

        user.refreshSession(refreshToken, (err, session) => {
            if (err) {
                console.error(err);
                return;
            }

            const user = {
                userName: userName,
                accessToken: session.getAccessToken().getJwtToken(),
                refreshToken: session.getRefreshToken().getToken(),
            }

            storeUserData(user);
        });

    } catch (e) {
        console.error(e);
    }
}