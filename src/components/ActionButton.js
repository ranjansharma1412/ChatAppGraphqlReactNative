import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const ActionButton = ({ label, customStyle, ...others }) => {
    return (
        <TouchableOpacity style={styles.root} {...others}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ActionButton;

const styles = StyleSheet.create({
    root: {
        padding: 5,
        paddingVertical:15,
        backgroundColor: '#53C4E2',
        borderRadius: 10,
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign:'center'
    }
})
