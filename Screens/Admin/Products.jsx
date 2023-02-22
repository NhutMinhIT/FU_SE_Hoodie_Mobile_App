import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Input } from 'native-base';
import { useFocusEffect } from "@react-navigation/native"
import { MaterialIcons } from "@expo/vector-icons";

//IMPORT FILE
import ListItem from "./ListItem";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
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
            <View style={styles.headerItem}><Text style={{ fontWeight: '600' }}>Image</Text></View>
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

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerProducts_admin}>Products Admin Page</Text>
            </View>
            <View style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Orders")}
                >
                    <MaterialIcons name="shopping-bag" color={'#f5e3cb'} size={20} />
                    <Text style={styles.buttonText}>Orders</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("ProductForm")}
                >
                    <MaterialIcons name="add" color={'#f5e3cb'} size={20} />
                    <Text style={styles.buttonText}>Product</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <MaterialIcons name="add" color={'#f5e3cb'} size={20} />
                    <Text style={styles.buttonText}>Categories</Text>
                </EasyButton>
            </View>
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <Input

                    placeholder="Search"
                    onChangeText={(text) => searchProduct(text)}
                    style={{ backgroundColor: '#f5e3cb' }}
                />
                <MaterialIcons name="search" color={'black'} size={20} style={{ position: "absolute", left: '90%', top: 8 }} />
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
                            delete={deleteProduct}
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
        backgroundColor: '#f2b76b'
    },
    headerItem: {
        margin: 3,
        width: width / 6,
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: '#f5f2eb'
    },
    buttonContainer: {
        margin: 8,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    },
    headerProducts_admin: {
        backgroundColor: '#f5f2eb',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    }

})
export default Products;


