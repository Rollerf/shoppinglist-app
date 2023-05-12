import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import { StatusBar } from "expo-status-bar";
import { Dictionary } from '../hooks/Dictionary';
import { CognitoPool } from '../config/CognitoPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { storeUserData } from '../services/UserService';
import { User } from '../models/User';

export default function LoginScreen({ navigation }: any) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { Auth, General } = Dictionary;

  // -------------------- ACTIONS -------------------- //
  const onPressLogin = () => {
    console.debug('LoginScreen: onPressLogin');

    if (!userName || !password) {
      return Alert.alert(General.Error, Auth.EnterRequiredFields);
    }

    const user = new CognitoUser({
      Username: userName,
      Pool: CognitoPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: userName,
      Password: password,
    });

    //TODO: If access token is expired, refresh session.
    //Do this in another place
    // user.refreshSession

    user.authenticateUser(authDetails, {
      onSuccess: async res => {
        resetForm();

        const refreshToken = res?.getRefreshToken()?.getToken();
        const accessToken = res?.getAccessToken()?.getJwtToken();

        let userLoged: User = {
          userName: userName,
          refreshToken: refreshToken,
          accessToken: accessToken
        };

        storeUserData(userLoged);

        setTimeout(() => {
          console.debug("Navigate to Home");
          console.log("User Loged: ", userLoged.userName);
          console.log("RefreshToken: ", userLoged.refreshToken);
          console.log("AccessToken: ", userLoged.accessToken);
          navigation.navigate('TakePhoto');
        }, 350);
      },

      onFailure: err => {
        console.debug('LoginScreenError: ', err);

        if (err.name === 'NotAuthorizedException') {
          return Alert.alert(General.Error, Auth.IncorrectCredentials);
        }

        return Alert.alert(General.Error, General.SomethingWentWrong);
      }
    });
  };

  const resetForm = () => {
    setUserName('');
    setPassword('');
  };

  // -------------------- FIELDS -------------------- //
  const fields = {
    userName: {
      placeholder: Auth.UserName,
    },
    password: {
      placeholder: Auth.Password,
      secureTextEntry: true,
    },
  };

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      marginBottom: 40,
    },
    inputView: {
      backgroundColor: "#ADD8E6",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#ADD8E6",
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          onChangeText={(userName) => setUserName(userName)}
          {...fields.userName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
          {...fields.password}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={onPressLogin}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
