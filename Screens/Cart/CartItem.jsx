import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Box, Button, Stack, Text, View } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome";

import * as actions from '../../Redux/Actions/cartActions'
import { connect } from 'react-redux';

const CartItem = (props) => {
    const data = props.item.item;
    // const [quantity, setQuantity] = useState(props.item.item.quantity)

    return (
        // <View style={styles.listItem}
        //     key={Math.random()}
        //     avatar
        // >
        <Stack style={styles.body}>
            <Avatar source={{
                uri: data.product.image
                    ? data.product.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
            }} />

            <Text style={{ marginLeft: 40 }}>{data.product.name.length > 15
                ? data.product.name.substring(0, 15 - 3)
                + '...' : data.product.name}</Text>
            <Text style={{ position: 'absolute', left: 250, fontWeight: '900' }}>${data.product.price}</Text>

        </Stack>
        // </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'none',
        justifyContent: 'center',
        borderRadius: 10

    },
    body: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row'
    },
})
export default CartItem