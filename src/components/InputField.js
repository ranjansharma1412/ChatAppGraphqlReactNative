import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const InputField = ({ label, customStyle, customInputStyle, ...others }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                {...others}
            />
        </View>
    )
}

export default InputField;

const styles = StyleSheet.create({
    root: {
        marginTop: 15,
        paddingHorizontal: 15
    },
    input: {
        width: '100%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal:10
    },
    label: {
        fontSize: 16,
        color: '#68696A',
        paddingBottom:5
    }
})
