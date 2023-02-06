import { ScrollView } from 'native-base'
import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Email'
                    placeholderTextColor='#003f5c'
                    onChange={(email) => setEmail(email)}
                />
            </View >
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Password'
                    placeholderTextColor='#003f5c'
                    secureTextEntry={true}
                    onChange={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgotBtn}>Forgot Password?</Text>
                <Text style={styles.forgotBtn}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 98,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "green",
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
    forgotBtn: {
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
        backgroundColor: "yellow",
    }
})

export default Login
