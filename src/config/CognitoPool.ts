import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { REACT_APP_CLIENT_ID, REACT_APP_USER_POOL_ID } from "@env";

const USER_POOL_ID = REACT_APP_USER_POOL_ID || "";
const CLIENT_ID = REACT_APP_CLIENT_ID || "";

const poolData = {
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID,
};

export const CognitoPool = new CognitoUserPool(poolData);