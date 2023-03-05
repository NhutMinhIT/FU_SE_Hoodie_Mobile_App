import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Select, CheckIcon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

import TrafficLight from './StyledComponents/TracfficLight'
import EasyButton from "./StyledComponents/EasyButton";
import Toast from 'react-native-toast-message'

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

const codes = [
    { name: "Pending", code: '3' },
    { name: "Shipped", code: '2' },
    { name: "Delivered", code: '1' }

]

const OrderCard = (props) => {

    const [orderStatus, setOrderStatus] = useState()
    const [statusText, setStatusText] = useState()
    const [statusChange, setStatusChange] = useState()
    const [token, setToken] = useState()
    const [cardColor, setCardColor] = useState()

    useEffect(() => {

        if (props.editMode) {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res);
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        if (props.status == "3") {
            setOrderStatus(<TrafficLight unavailable></TrafficLight>)
            setStatusText("Pending")
            setCardColor("#fc6353")
        } else if (props.status == 2) {
            setOrderStatus(<TrafficLight limited></TrafficLight>)
            setStatusText("Shipped")
            setCardColor("#ffe98f")
        } else {
            setOrderStatus(<TrafficLight available></TrafficLight>)
            setStatusText("Delivered")
            setCardColor("#a4f5cb")
        }
        return () => {
            setOrderStatus,
                setStatusText,
                setCardColor
        }
    }, [])

    const updateOrder = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        const order = {
            city: props.city,
            country: props.country,
            dateOrdered: props.dateOrdered,
            id: props.id,
            orderItems: props.orderItems,
            phone: props.phone,
            shippingAddress1: props.shippingAddress1,
            shippingAddress2: props.shippingAddress2,
            status: statusChange,
            totalPrice: props.totalPrice,
            user: props.user,
            zip: props.zip

        }

        axios
            .put(`${baseURL}orders/${props.id}`, order, config)
            .then((res) => {

                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'Order Edit Successfully !!!',
                        text2: ''
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Products")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Order Failed ! ',
                    text2: 'Pleas Again !!!'
                })
            })
    }


    return (
        <View style={[{ backgroundColor: cardColor }, styles.container]}>
            <View style={styles.container}>
                <Text>OrderNumber: #{props.id}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>
                    Status: {statusText} {orderStatus}
                </Text>
                <Text>
                    Name: {props.user.name}
                </Text>
                <Text>
                    Phone: {props.phone}
                </Text>

                <Text>
                    Address: {props.shippingAddress1}, {props.shippingAddress2}
                </Text>
                <Text>
                    City: {props.city}
                </Text>
                <Text>
                    Country: {props.country}
                </Text>
                <Text>
                    Date Ordered: {props.dateOrdered.split("T")[0]}
                </Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>${props.totalPrice}</Text>
                </View>
                {props.editMode ? (
                    <View>
                        <Select
                            mode="dropdown"
                            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                            style={{ width: undefined }}
                            selectedValue={statusChange}
                            placeholder="Change Status"
                            accessibilityLabel="Choose Status"
                            placeholderTextColor={'#010a5c'}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }}
                            onValueChange={(e) => setStatusChange(e)}
                        >
                            {codes.map((c) => {
                                return (
                                    <Select.Item key={c.code} label={c.name} value={c.code} />
                                );
                            })}
                        </Select>
                        <EasyButton
                            secondary
                            large
                            onPress={() => updateOrder()}>
                            <Text style={{ color: "white" }}>Update</Text>
                        </EasyButton>
                    </View>
                ) : null}




            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    title: {
        backgroundColor: "#62B1F6",
        padding: 5,
    },
    priceContainer: {
        borderWidth: 3,
        borderColor: '#0f64f7',
        backgroundColor: 'orange',
        marginTop: 10,
        marginBottom: 9,
        alignSelf: "flex-end",
        flexDirection: "row",
    },
    price: {
        color: "white",
        fontWeight: "900",
        fontSize: 20,

    },
});

export default OrderCard;
