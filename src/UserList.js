import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { GET_ALL_USER } from './graphQL/authGraohQL.js';

const { width, height } = Dimensions.get('window');

const data = [
    {
        id: 1,
        firstname: "Ranjan",
        lastname: "Sharma",
        email: "ranjan123@gmail.com",
    },
    {
        id: 2,
        firstname: "Sagar",
        lastname: "Sharma",
        email: "sagar123@gmail.com",
    },
    {
        id: 3,
        firstname: "Parth",
        lastname: "Sharma",
        email: "parth123@gmail.com",
    },
    {
        id: 4,
        firstname: "Harsh",
        lastname: "Sharma",
        email: "harsh123@gmail.com",
    },
    {
        id: 1,
        firstname: "Krishna",
        lastname: "Sharma",
        email: "krishna123@gmail.com",
    },
    {
        id: 1,
        firstname: "Harmi",
        lastname: "Rola",
        email: "harmi123@gmail.com",
    },
]

const UserList = (props) => {

    const { loading, error, data } = useQuery(GET_ALL_USER);
    // console.log("=== aLL USER==error", JSON.stringify(error));
    // console.log("=== aLL USER==data", JSON.stringify(data)); 

    const [userInfo, setuserInfo] = useState()

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        let userInfo = await AsyncStorage.getItem('@userInfo')
        if (userInfo && userInfo !== null) {
            userInfo = JSON.parse(userInfo);
            setuserInfo(userInfo)
        }
    }


    const _renderEmptyList = () => {
        return (
            <View style={{ width: width, height: height / 2, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}>No Any User registered yet</Text>
            </View>
        )
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemContainer} key={index}>
                <Text style={{ width: '30%' }}>
                    {item.firstName + "   "} {item.lastName}
                </Text>
                <Text style={{ width: '50%' }}>
                    {item.email}
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("ChatScreen", { currentUser: item, userInfo })} style={styles.chatBtn}>
                    <Text style={styles.btnText}>Chat</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <FlatList
                data={data?.getAllUsers || []}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={_renderEmptyList}
            />
        </View>
    )
}

export default UserList;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#E4E8EA',
        paddingHorizontal: 15,
        paddingTop: 20
    },
    itemContainer: {
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 15
    },
    chatBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#33ABCB',
        borderRadius: 25,
    },
    btnText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 12
    }
})
