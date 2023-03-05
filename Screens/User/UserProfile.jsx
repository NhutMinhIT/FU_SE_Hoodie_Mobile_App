import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCard from '../../Shared/OrderCard'
//API
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {

    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => setUserProfile(user.data))
                })
                .catch((error) => console.log(error))

            axios
                .get(`${baseURL}orders`)
                .then((x) => {
                    const data = x.data;
                    console.log(data)
                    const userOrders = data.filter(
                        (order) => order.user.id === context.stateUser.user.userId
                    );
                    setOrders(userOrders);

                })
                .catch((error) => console.log(error))

            return () => {
                setUserProfile();
                setOrders();
            }

        }, [context.stateUser.isAuthenticated]))
    return (

        <ScrollView contentContainerStyle={styles.subContainer}>
            <Text style={{ fontSize: 30 }}>
                {userProfile ? userProfile.name : "USER"}
            </Text>
            <View style={{ marginTop: 20 }}>
                <Text style={{ margin: 10 }}>
                    Email: {userProfile ? userProfile.email : "user"}
                </Text>
                <Text style={{ margin: 10 }}>
                    Phone: {userProfile ? userProfile.phone : "user"}
                </Text>
            </View>
            <View style={{ marginTop: 80 }}>
                <Button title={"Sign Out"} onPress={() => [
                    AsyncStorage.removeItem("jwt"),
                    logoutUser(context.dispatch)
                ]} />
            </View>
            <View style={styles.order}>
                <Text style={{ fontSize: 20 }}>My Orders</Text>
                <View>
                    {orders ? (
                        orders.map((x) => {
                            return <OrderCard key={x.id} {...x} />;
                        })
                    ) : (
                        <View style={styles.order}>
                            <Text>You have no orders</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})
export default UserProfile;