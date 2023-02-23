import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

import { Text, View, Button } from 'react-native';
import { Item, Picker, Select } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//redux 
import { connect } from 'react-redux'

const contries = require('../../../assets/countries.json')

const Checkout = (props) => {
    const navigation = useNavigation();

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState()
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState()
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState()

    useEffect(() => {
        setOrderItems(props.cartItems)

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone: phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            zip
        }
        navigation.navigate("Payment", { order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />

                <Select
                    mode='dropdown'
                    minWidth='300'
                    minHeight='15'
                    placeholder="Select Your Country"
                    iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                    selectedValue={country}
                    placeholderStyle={{ color: '007aff' }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => setCountry(e)}
                >
                    {contries.map((c) => {
                        return (
                            <Select.Item key={c.code}
                                label={c.name}
                                value={c.name}
                            />
                        )
                    })}
                </Select>

                <View style={{ width: '80%', alignItems: 'center' }}>
                    <Button title='Confirm' onPress={() => checkOut()} />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}
export default connect(mapStateToProps)(Checkout)

