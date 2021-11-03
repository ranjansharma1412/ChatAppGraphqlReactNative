import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {

    },
    floatingButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        right: 60,
        backgroundColor:'red'
    },
    iconText:{
        fontSize:25,
        color:'white',
        textAlign:'center'
    }
})


export default styles;