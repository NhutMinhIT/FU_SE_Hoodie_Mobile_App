import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { useNavigation } from '@react-navigation/native';

//import File
import Error from "../../Shared/Error";

const Login = (props) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    //Handle Event 
    const handleSubmit = () => {
        const user = {
            email,
            password
        };

        if (email === "" || password === "") {
            setError("Please enter infor of you ! ")
        } else {
            console.log('Success !!')
        }
    }

    return (
        <FormContainer title={"Login"}>
            <Input
                placeholder={"Enter Email"}
                name={'email'}
                id={'email'}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={'Enter Password'}
                name={'password'}
                id={'password'}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title="Login" onPress={() => handleSubmit()} />
            </View>
            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>Don't have an account yet?</Text>
                <Button title="Register"
                    onPress={() => navigation.navigate("Register")
                    } />
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        alignItems: "center",
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center",
    },
});
export default Login;