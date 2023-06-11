import { CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { CognitoPool } from '../config/CognitoPool';
import { getUserData, storeUserData } from './UserService';
import { User } from '../models/User';

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

function refreshSession(cognitoUser: CognitoUser, refreshToken: CognitoRefreshToken) {
    console.debug("refreshSession");
    return new Promise((resolve, reject) => {
        cognitoUser.refreshSession(refreshToken, (err, session) => {
            if (err) {
                console.error("Error refresSession", err);
                reject(err);
            }

            resolve(session);
        });
    });
}

export const refreshAccessToken = async () => {
    const userName = userLoged;

    if (await isValidToken()) {
        return;
    }

    console.debug("refreshAccessToken");

    try {
        const cognitoUser = new CognitoUser({
            Username: userName,
            Pool: CognitoPool,
        });

        const userData = await getUserData();
        const token = userData?.refreshToken != null ? userData.refreshToken : '';
        const refreshToken = new CognitoRefreshToken({ RefreshToken: token });
        const session:any = await refreshSession(cognitoUser, refreshToken);
        
        if (!session) {
            console.error("Session is null");
            return;
        }

        const user = new User(
            userName,
            session.getRefreshToken().getToken(),
            session.getAccessToken().getJwtToken()
        );

        await storeUserData(user);
    } catch (e) {
        console.error("Error refreshing token", e);
    }
}

export const getAccessToken = async () => {
    console.debug("getAccessToken");
    const user = await getUserData();

    return user?.accessToken;
}