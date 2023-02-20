import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Box, Heading, Input } from 'native-base';
import { Icon } from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native"
import { MaterialIcons } from "@expo/vector-icons";

//IMPORT FILE
import ListItem from "./ListItem";
//FETCH API
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"

var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Price</Text>
            </View>
        </View>
    )
}

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) =>
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    return (
        <View>
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <Input
                    placeholder="Search"
                    onChangeText={(text) => searchProduct(text)}
                    style={{ backgroundColor: '#f5e3cb' }}
                />
            </View>

            {loading ? (

                <View style={styles.spinner}>
                    <ActivityIndicator size='large' color='red' />
                </View>

            ) : (

                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (

                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 4,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6,
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default Products;


