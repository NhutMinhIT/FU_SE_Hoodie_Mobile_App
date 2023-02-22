import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'
import { ScrollView, Select } from 'native-base'
import Toast from "react-native-toast-message/lib/src/Toast";
import { MaterialIcons } from "@expo/vector-icons";
//Custome UI
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from '../../Shared/Error'
import AsyncStorage from "@react-native-async-storage/async-storage"
//API 
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

const ProductForm = (props) => {
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);
    return (

        <FormContainer title="ADD NEW PRODUCT">
            <View>
                <Image source={{ uri: mainImage }} />
                <TouchableOpacity>
                    <Text>
                        Image
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text>Brand:</Text>
            </View>
            <Input
                placeholder='Brand'
                name='brand'
                id='brand'
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            <View style={styles.label}>
                <Text>Name:</Text>
            </View>
            <Input
                placeholder='Name'
                name='name'
                id='name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Input
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />
            <View style={styles.label}>
                <Text>Count in Stock</Text>
            </View>
            <Input
                placeholder="Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />
            <View style={styles.label}>
                <Text>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
        </FormContainer>

    )
}

const styles = StyleSheet.create({
    label: {
        width: '80%',
        marginTop: 10,
    }
})
export default ProductForm;