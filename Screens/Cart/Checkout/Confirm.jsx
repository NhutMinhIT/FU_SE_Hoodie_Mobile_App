import React from 'react'
import { View, HStack, VStack, List, Avatar, FlatList, Box, Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions.js'
import { Dimensions, StyleSheet, ScrollView, Text } from 'react-native'
import Toast from 'react-native-toast-message'

import baseURL from '../../../assets/common/baseUrl.js'
import axios from 'axios'


var { height, width } = Dimensions.get("window")

const finalOrder = (props) => {
    const finalOrder = props.route.params;

    const confrmOrder = () => {

        const order = finalOrder.order.order;

        axios
            .post(`${baseURL}orders`, order)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'Order Successfully !!!',
                        text2: ''
                    })
                    setTimeout(() => {
                        props.clearCart();
                        props.navigation.navigate("Cart")
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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Conrm Order</Text>
                {props.route.params ?
                    <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                        <Text style={styles.shipping}>Shipping to:</Text>
                        <View style={{ padding: 8 }}>
                            <Text>Phone: {finalOrder.order.order.phone}</Text>
                            <Text>Addres: {finalOrder.order.order.shippingAddress1}</Text>
                            <Text>Addres2: {finalOrder.order.order.shippingAddress2}</Text>
                            <Text>City: {finalOrder.order.order.city}</Text>
                            <Text>ZipCode: {finalOrder.order.order.zip}</Text>
                            <Text>Zip: {finalOrder.order.order.country}</Text>

                        </View>
                        {finalOrder.order.order.orderItems.map((x) => {
                            return (
                                <List style={styles.listItem}
                                    key={x.product.name}
                                    avatar
                                >
                                    <Text style={styles.titleItem}>Items:</Text>
                                    <HStack style={styles.box}>
                                        <Avatar source={{ uri: x.product.image }} />
                                        <Text>{x.product.name}</Text>
                                        <Text style={{
                                            marginLeft: 15,
                                            fontSize: 16,
                                            fontWeight: '500',
                                            color: 'red'
                                        }}>${x.product.price}</Text>
                                    </HStack>

                                </List>
                            )
                        })}
                    </View>
                    : <View>
                        <Text style={{ marginTop: '40%', color: 'red', fontWeight: '500' }}>No order information yet.</Text></View>
                }
                <Button onPress={confrmOrder}>Place Order</Button>
            </View>
        </ScrollView >)
}

const mapDispathchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 0,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        margin: 8,
        alignItems: 'center'
    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: '700'
    },
    titleItem: {
        justifyContent: 'center',
        margin: 8,
        fontWeight: '700',
        fontSize: 16
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    box: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    }
})
export default connect(null, mapDispathchToProps)(finalOrder)