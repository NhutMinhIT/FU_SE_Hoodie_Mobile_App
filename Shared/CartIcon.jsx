import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
    return (
        <>
            {props.cartItems.length ? (
                <Badge style={styles.badge}>
                    <Text style={styles.text}>{props.cartItems.length}</Text>
                </Badge>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    };
};

const styles = StyleSheet.create({
    badge: {
        width: 20,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -10,
        right: -15,
        borderRadius: '100%',
        backgroundColor: '#f5c5b3'

    },
    text: {
        fontSize: 15,
        width: 100,
        fontWeight: "bold",
        top: 0,
        right: -46,
        position: "relative",

    },
});

export default connect(mapStateToProps)(CartIcon);