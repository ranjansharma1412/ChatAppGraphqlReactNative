import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionButton from './components/ActionButton'
import InputField from './components/InputField'
import { SIGN_UP_USER } from './graphQL/authGraohQL.js'

const Register = (props) => {

    const [firstName, setfirstName] = useState()
    const [lastName, setlastName] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    const [createAuthor, { data, loading, error }] = useMutation(SIGN_UP_USER);
    console.log("==error===",JSON.stringify(error));
    console.log("==data===",JSON.stringify(data));

    const onRegister = async () => {
        createAuthor({ variables: { firstName: firstName, lastName: lastName, email: email, password: password } });
        props.navigation.goBack();
        setfirstName('')
        setlastName('')
        setemail('')
        setpassword('')
    }

    return (
        <View style={styles.root}>
            <View style={{ marginTop: '20%',paddingHorizontal:20 }}>
                <InputField
                    value={firstName}
                    onChangeText={(firstName) => setfirstName(firstName)}
                    placeholder="Enter first name"
                    label={"First Name"}
                />
                <InputField
                    value={lastName}
                    onChangeText={(lastName) => setlastName(lastName)}
                    placeholder="Enter last name"
                    label={"Last Name"}
                />
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
                    <ActionButton label={"Register"} onPress={() => onRegister()} />
                </View>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#E4E8EA',
    }
})
