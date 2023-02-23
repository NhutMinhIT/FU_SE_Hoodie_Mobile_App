import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
//Import FILE
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
//IMPORT API
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {


        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Please fill in the form correctly");
        }
        else if (!email.includes('@')) {
            setError('Please fill in correct email')
        }
        else {
            let user = {
                name: name,
                email: email,
                password: password,
                phone: phone,
                isAdmin: false
            };
            axios
                .post(`${baseURL}users/register`, user)
                .then((res) => {
                    if (res.status = 200) {
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: 'Register Successfully !!!',
                            text2: 'Please login into your account !'
                        })
                        setTimeout(() => {
                            navigation.navigate("Login");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: 'error',
                        text1: 'Something went wrong !',
                        text2: "Please try again !",
                    })
                });
        }
    }



    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Register User"}>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <EasyButton
                        large
                        primary
                        onPress={() => handleRegister()} >
                        <Text style={{ color: 'white' }}>Register</Text>
                    </EasyButton>
                </View>
                <View>
                    <EasyButton
                        secondary
                        large
                        onPress={() => navigation.navigate("Login")
                        }
                    >
                        <Text style={{ color: 'white' }}>Back To Login</Text>
                    </EasyButton>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
});
export default Register