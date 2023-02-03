import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProductCard from './ProductCard'

var { width } = Dimensions.get("window");

const ProductList = (props) => {
    const navigation = useNavigation();

    const { item } = props;
    return (
        <TouchableOpacity
            style={{ width: '50%' }}
            onPress={() => navigation.navigate("Product Details", { item: item })
            }
        >
            <View style={{
                width: width / 2,
                backgroundColor: '#f5f2eb'
            }}
            >
                <ProductCard {...item} />
            </View>
        </TouchableOpacity >
    )
}

export default ProductList;