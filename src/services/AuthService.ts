import { CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { CognitoPool } from '../config/CognitoPool';
import { getUserData, storeUserData } from './UserService';

const userLoged = "userLoged";

export const isLogedIn = async () => {
    try {
        const isLoged = await AsyncStorage.getItem(userLoged);

        return isLoged != null;
    } catch (e) {
        console.error(e);
    }

    return false;
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
    } catch (e) {
        console.error(e);
    }

    return false;
}

export const refreshAccessToken = async () => {
    const userName = userLoged;

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

export const getAccessToken = async () => {
    const user = await getUserData();
    console.debug("getAccessToken ", user?.accessToken);

    return user?.accessToken;
}