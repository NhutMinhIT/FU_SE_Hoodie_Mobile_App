import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    FlatList
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import OrderCard from "../../Shared/OrderCard";

const Orders = (props) => {

    const [orderList, setOrderList] = useState();

    useFocusEffect(
        useCallback(() => {
            getOrder();
            return () => {
                setOrderList();
            }
        }, [])
    )

    const getOrder = () => {
        axios
            .get(`${baseURL}orders`)
            .then((x) => {
                setOrderList(x.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View>
            <FlatList
                data={orderList}
                renderItem={({ item }) => (
                    <OrderCard
                        navigation={props.navigation}
                        {...item}
                        editMode={true}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
export default Orders;