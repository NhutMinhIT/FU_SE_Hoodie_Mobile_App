import React, { useState } from "react";
import { Image, View, StyleSheet, Text, ScrollView } from "react-native";
import { HStack, VStack, Container, Heading, Stack, Box, Button } from "native-base";

const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('')
    const uriNull = 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png';

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader}>{item.name}</Heading>
                    <Text style={styles.contentText}>{item.brand}</Text>
                    <Text style={styles.contentText}>{item.description}</Text>
                </View>
            </ScrollView>
            <Stack>
                <View style={styles.bottomContainer}>
                    <Text style={styles.price}>{item.price}$</Text>

                </View>
                <View style={styles.button}>
                    <Button backgroundColor={'orange.600'}>Add</Button>
                </View>
            </Stack>

        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',

    },
    imageContainer: {
        backgroundColor: '#f5f2eb',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    price: {
        fontSize: 20,
        margin: 20,
        color: 'red',

    },
    button: {
        width: 200,
        position: 'absolute',
        bottom: 15,
        right: 20,
        borderRadius: 10
    },

    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})
export default SingleProduct;
