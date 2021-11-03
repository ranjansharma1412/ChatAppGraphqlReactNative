import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const SplashScreen = (props) => {

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {
        let userInfo = await AsyncStorage.getItem('@userInfo')
        if (userInfo && userInfo != null) {
            userInfo = JSON.parse(userInfo)
            global.token = userInfo.token;
            props.navigation.dispatch(
                StackActions.replace('UserList')
            );
        }else{
            props.navigation.dispatch(
                StackActions.replace('Login')
            );
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#18C29B" />
            <Text style={{ marginTop: 20, textAlign: 'center' }}>Loading...</Text>
        </View>
    )
}

export default SplashScreen
