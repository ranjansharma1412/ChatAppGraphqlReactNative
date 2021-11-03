import { useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionButton from './components/ActionButton'
import InputField from './components/InputField'
import { LOGIN_USER } from './graphQL/authGraohQL.js'

const Login = (props) => {

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [login, { data, loading, error }] = useMutation(LOGIN_USER);
    console.log("loginUser===", data);
    console.log("loginUser==error=",
        JSON.stringify(error));

    useEffect(() => {
        if (data?.login?.token) {
            setLoginInfo(data?.login,data?.login?.token)
        }

    }, [data?.login])

    const setLoginInfo = async (data,token) => {
        await AsyncStorage.setItem('@authToken', token)
        await AsyncStorage.setItem('@userInfo', JSON.stringify(data))
        global.token = token;
        props.navigation.dispatch(
            StackActions.replace('UserList')
        );
    }


    const onLogin = async () => {
        login({ variables: { email: email, password: password } });
        // setTimeout(async () => {
        //     console.log("==data.login==", data?.login?.token);
        //     if (data?.login?.token) {
        //         await AsyncStorage.setItem('@authToken', data?.login?.token)
        //         global.token = data?.login?.token;
        //         props.navigation.dispatch(
        //             StackActions.replace('UserList')
        //         );
        //     }
        //     // client.resetStore()
        //     console.log("====JSON.stringify(error)===", JSON.stringify(error))
        //     // if (error?.message) {
        //     //     Alert.alert("Error", error?.message)
        //     // } else {
        //     //     props.navigation.navigate("Home");
        //     // }

        // }, 2000);
    }


    return (
        <View style={styles.root}>
            <View style={{ marginTop: '20%', paddingHorizontal: 20 }}>
                <InputField
                    value={email}
                    onChangeText={(email) => setemail(email)}
                    placeholder="Enter email id"
                    label={"Email"}
                />
                <InputField
                    value={password}
                    onChangeText={(password) => setpassword(password)}
                    placeholder="Enter password"
                    label={"Password"}
                />
                <View style={{ marginTop: 50, paddingHorizontal: '20%' }}>
                    <ActionButton label={"Login"} onPress={() => onLogin()} />
                </View>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Not Registered? <Text onPress={() => props.navigation.navigate('Register')} style={styles.link}>Register Now</Text></Text>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#E4E8EA',
    },
    link: {
        color: '#42BAD9',
        paddingLeft: 5
    }
})
