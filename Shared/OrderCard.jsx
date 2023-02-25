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
                    Address: {props.shippingAddress1} ||  {props.shippingAddress2}
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
                <EasyButton secondary large onPress={() => updateOrder()}>
                    <Text style={{ color: "white" }}>Update</Text>
                </EasyButton>
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
