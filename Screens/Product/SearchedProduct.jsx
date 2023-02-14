import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native'
import { Left, Body, ListItem, Thumbnail, Text, Content, VStack, Image, HStack, Avatar, Box, ScrollView } from 'native-base';

//Navigation
import { useNavigation } from '@react-navigation/native';

var { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productsFiltered } = props;

    const navigation = useNavigation();

    const { item } = props;
    return (

        <ScrollView>
            <Box style={{ width: width }}>
                {productsFiltered.length > 0 ? (
                    productsFiltered.map((item) => (
                        <View
                            key={item._id}
                            avatar
                        >

                            <HStack space={4}>
                                <Avatar source={{
                                    uri: item.image ?
                                        item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'

                                }}
                                    style={{ marginTop: '5%' }}
                                    onPress={() => {
                                        navigation.navigate("Product Details", { item: item })
                                    }}
                                />

                                <VStack style={{ marginBottom: '10%', marginTop: '5%' }}>
                                    <Text>{item.name}</Text>
                                    <Text note>{item.description}</Text>
                                </VStack>
                            </HStack>

                        </View>
                    ))
                ) : (
                    <View style={styles.center}>
                        <Text style={{ alignSelf: 'center' }}>
                            No products match the selected criteria
                        </Text>
                    </View>
                )}

            </Box>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProduct;