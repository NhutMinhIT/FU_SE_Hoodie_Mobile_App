import { Box, Container, Flex, HStack, Icon, Input, ScrollView, Stack, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Dimensions } from 'react-native'

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

const data = require('../../assets/data/products.json')
const productsCategories = require('../../assets/data/categories.json')

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([])
    const [focus, setFocus] = useState()
    //Categories
    const [productsCtg, setProductsCtg] = useState([])
    const [categories, setCategories] = useState([])
    const [active, setActive] = useState()
    const [initialState, setInitialState] = useState([])

    useEffect(() => {
        setProducts(data)
        setProductsFiltered(data)
        setFocus(false)
        //categories
        setCategories(productsCategories)
        setProductsCtg(data)
        setActive(-1)
        setInitialState(data)

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
            setCategories([])
            setActive()
            setInitialState()
        }
    }, [])

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    // Categories
    const changeCtg = (ctg) => {
        {
            ctg === "all"
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => i.category.$oid === ctg),
                        setActive(true)
                    ),
                ];
        }
    };

    return (

        <View style={{ marginTop: 30 }}>
            <Box>

                <Input w={{
                    base: "100%",
                    md: "10%",

                }} InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />} placeholder="Search"
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}

                />
                {focus == true ? (<MaterialIcons name="close" onPress={onBlur} style={{ position: 'absolute', left: '92%', top: '25%' }} size={20} />) : null}

            </Box>
            {focus == true ? (
                <SearchedProduct productsFiltered={productsFiltered} />
            ) : (
                <ScrollView >

                    <View>
                        <Banner />
                    </View>
                    <CategoryFilter
                        categories={categories}
                        categoryFilter={changeCtg}
                        productsCtg={productsCtg}
                        active={active}
                        setActive={setActive}
                    />
                    {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                            {productsCtg.map((item) => {
                                return (

                                    <ProductList
                                        key={item._id.$oid}
                                        item={item}
                                    />
                                )
                            })}
                        </View>

                    ) : (
                        <View style={[styles.center, { height: height / 2 }]}>
                            <Text>No products found</Text>
                        </View>
                    )}

                </ScrollView>
            )
            }

        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        paddingBottom: 120
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer; ``